import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserPracticeDayData } from 'src/interfaces/user-practice-day/IUserPracticeDay';
import { IUserTraning } from 'src/interfaces/user-traning/user-traning';
import { UserExerciseService } from 'src/services/user-exercise/user-exercise.service';
import { UserTraningService } from 'src/services/user-traning/user-traning.service';
import { UserTraningPracticeService } from 'src/services/userTraningPractice/user-traning-practice.service';

@Component({
  selector: 'app-user-exercise',
  templateUrl: './user-exercise.component.html',
  styleUrls: ['./user-exercise.component.css'],
})
export class UserExerciseComponent implements OnInit {
  public createUserTraningForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  public loaderVisible: boolean = false;
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public userId!: string | null;
  public userTranings!: IUserTraning[];
  public currentExerciseIndex: number = 0;
  public activeTraningId!: string | null;

  public pageOwner!: boolean;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private userTraningService: UserTraningService,
    private userPracticeService: UserTraningPracticeService,
    private userExerciseService: UserExerciseService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.getCurrentActiveTraning();
    this.createUserTraningForm = this.fb.group({
      tittle: ['', [Validators.required]],
    });
  }

  getCurrentActiveTraning(): void {
    if (localStorage.getItem('traningDay')) {
      this.loaderVisible = true;
      this.userPracticeService
        .getUserTraning(localStorage.getItem('traningDay'))
        .pipe(takeUntil(this.destroy$))
        .pipe(
          map((data: Object) => {
            return data as IUserPracticeDayData;
          })
        )
        .subscribe({
          next: (data: IUserPracticeDayData) => {
            this.activeTraningId = data.userExerciseDayId;
          },
        })
        .add(() => {
          this.loaderVisible = false;
        });
    }
  }

  getUserId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });

    this.pageOwner =
      Number(localStorage.getItem('id')) === Number(this.userId) ? true : false;

    this.getUserTraning(this.userId);
  }

  deleteUserTraning(id: number): void {
    if (Number(this.activeTraningId) == id) {
      this.errorMessage = 'Завершите активную тренировку';
      this.bgColorNotification = 'error';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    } else {
      this.deleteExercise(id.toString());
      this.deleteTraning(id);
    }
  }

  deleteExercise(userExerciseDayId: string | null): void {
    this.loaderVisible = true;
    this.userExerciseService
      .deleteUserExercises(userExerciseDayId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {},
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  deleteTraning(id: number): void {
    this.loaderVisible = true;
    this.userTraningService
      .deleteUserTraning(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getUserTraning(this.userId);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  onSubmit(): void {
    this.loaderVisible = true;
    this.userTraningService
      .setUserTraning({
        ...this.createUserTraningForm.value,
        userProfileId: this.userId,
      })
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserTraning;
        })
      )
      .subscribe({
        next: () => {
          this.errorMessage = 'Успешно!';
          this.bgColorNotification = 'success';
          this.createUserTraningForm.reset();
          this.getUserTraning(this.userId);
        },
        error: (error) => {
          this.bgColorNotification = 'error';
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  getUserTraning(userId: string | null): void {
    this.loaderVisible = true;
    this.userTraningService
      .getUserTraning(userId)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserTraning[];
        })
      )
      .subscribe({
        next: (data: IUserTraning[]) => {
          this.userTranings = data;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  getUserExerciseInfo(id: number | null): void {
    this.route.navigate([`user-exercise-info/${id}/${this.userId}`]);
  }

  getUserExerciseSettings(id: number | null): void {
    this.route.navigate([`user-exercise-settings/${id}/${this.userId}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
