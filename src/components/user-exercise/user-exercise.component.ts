import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserTraning } from 'src/interfaces/user-traning/user-traning';
import { UserTraningService } from 'src/services/user-traning/user-traning.service';

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

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private userTraningService: UserTraningService
  ) {}

  ngOnInit(): void {
    this.getUserId();

    this.createUserTraningForm = this.fb.group({
      tittle: ['', [Validators.required]],
    });
  }

  getUserId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });

    this.getUserTraning(this.userId);
  }

  deleteUserTraning(id: number): void {
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

  nextExercises(): void {
    if (this.currentExerciseIndex < this.userTranings.length - 1) {
      this.currentExerciseIndex =
        (this.currentExerciseIndex + 1) % this.userTranings.length;
    }
  }

  prevExercises(): void {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex =
        (this.currentExerciseIndex - 1 + this.userTranings.length) %
        this.userTranings.length;
    }
  }

  getUserExerciseInfo(id: number | null): void {
    this.route.navigate([`user-exercise-info//${id}`]);
  }

  getUserExerciseSettings(id: number | null): void {
    this.route.navigate([`user-exercise-settings/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
