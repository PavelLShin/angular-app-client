import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserExercise } from 'src/interfaces/user-exercises/user-exxercises';
import { IUserTraning } from 'src/interfaces/user-traning/user-traning';
import { UserExerciseService } from 'src/services/user-exercise/user-exercise.service';
import { UserTraningService } from 'src/services/user-traning/user-traning.service';

@Component({
  selector: 'app-user-exercise-info',
  templateUrl: './user-exercise-info.component.html',
  styleUrls: ['./user-exercise-info.component.css'],
})
export class UserExerciseInfoComponent implements OnInit {
  public destroy$: Subject<void> = new Subject<void>();
  public exerciseDayId!: string | null;
  public exerciseDayData!: IUserTraning;
  public loaderVisible: boolean = false;
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public exerciseUser!: IUserExercise[];
  public currentExerciseIndex: number = 0;
  public userId!: string | null;

  public pageOwner!: boolean;
  public pageUserId!: string | null;

  constructor(
    public route: Router,
    private userExerciseDayService: UserTraningService,
    public activatedRoute: ActivatedRoute,
    private userExerciseService: UserExerciseService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.getExerciseDayId();
    this.getUserIdInfo();
  }

  getUserIdInfo(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.pageUserId = params.get('userId');
    });

    this.pageOwner =
      Number(localStorage.getItem('id')) === Number(this.pageUserId)
        ? true
        : false;
  }

  getExerciseDayId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.exerciseDayId = params.get('id');
      this.getUserTraningDay(this.exerciseDayId);
      this.getUserExercises(this.exerciseDayId);
    });
  }
  getUserExercises(userExerciseDayId: string | null): void {
    this.loaderVisible = true;
    this.userExerciseService
      .getUserExercises(userExerciseDayId)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserExercise[];
        })
      )
      .subscribe({
        next: (data: IUserExercise[]) => {
          this.exerciseUser = data;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  getUserTraningDay(id: string | null): void {
    this.loaderVisible = true;
    this.userExerciseDayService
      .getOneUserTraning(id)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserTraning;
        })
      )
      .subscribe({
        next: (data: IUserTraning) => {
          this.exerciseDayData = data;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  nextExercises(): void {
    if (this.currentExerciseIndex < this.exerciseUser.length - 1) {
      this.currentExerciseIndex =
        (this.currentExerciseIndex + 1) % this.exerciseUser.length;
    }
  }

  prevExercises(): void {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex =
        (this.currentExerciseIndex - 1 + this.exerciseUser.length) %
        this.exerciseUser.length;
    }
  }

  getUserExerciseSettings(): void {
    this.route.navigate([
      `user-exercise-settings/${this.exerciseDayId}/${this.userId}`,
    ]);
  }

  onUserTraning(): void {
    if (this.pageOwner) {
      this.route.navigate([`user-traning/${this.userId}`]);
    } else {
      this.route.navigate([`user-traning/${this.pageUserId}`]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
