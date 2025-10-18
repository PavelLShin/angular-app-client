import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserExercise } from 'src/interfaces/user-exercises/user-exxercises';
import {
  IUpdatePracticeDayData,
  IUserPracticeDay,
  IUserPracticeDayData,
} from 'src/interfaces/user-practice-day/IUserPracticeDay';
import { IUserTraning } from 'src/interfaces/user-traning/user-traning';
import { TimerTraningService } from 'src/services/timer-traning/timer-traning.service';
import { UserExerciseService } from 'src/services/user-exercise/user-exercise.service';
import { UserTraningService } from 'src/services/user-traning/user-traning.service';
import { UserTraningPracticeService } from 'src/services/userTraningPractice/user-traning-practice.service';

@Component({
  selector: 'app-current-user-traning',
  templateUrl: './current-user-traning.component.html',
  styleUrls: ['./current-user-traning.component.css'],
})
export class CurrentUserTraningComponent implements OnInit {
  public destroy$: Subject<void> = new Subject<void>();
  public exerciseDayId!: string | null;
  public exerciseDayData!: IUserTraning;
  public loaderVisible: boolean = false;
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public exerciseUser!: IUserExercise[];
  public currentExerciseIndex: number = 0;
  public userId!: string | null;
  public startTraning!: boolean;
  public activeTraningId!: string | null;
  public activeTraningStart!: string;

  constructor(
    private userPracticeService: UserTraningPracticeService,
    public route: Router,
    private userExerciseDayService: UserTraningService,
    public activatedRoute: ActivatedRoute,
    private userExerciseService: UserExerciseService,
    private timerTraningService: TimerTraningService
  ) {}

  ngOnInit(): void {
    this.startTraning = !!localStorage.getItem('traningDay');
    this.userId = localStorage.getItem('id');
    this.getExerciseDayId();
    this.getCurrentActiveTraning();
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
            this.activeTraningStart = data.start;
          },
        })
        .add(() => {
          this.loaderVisible = false;
        });
    }
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

  createUserPracticeDay(data: IUserPracticeDay) {
    this.loaderVisible = true;
    this.userPracticeService
      .createUserTraningPractice(data)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserPracticeDayData;
        })
      )
      .subscribe({
        next: (data: IUserPracticeDayData) => {
          localStorage.setItem('traningDay', data.id);
          this.getCurrentActiveTraning();
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.bgColorNotification = 'red';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      })
      .add(() => {
        this.startTraning = !!localStorage.getItem('traningDay');
        this.loaderVisible = false;
      });
  }

  updateUserPracticeDay(data: IUpdatePracticeDayData) {
    this.loaderVisible = true;
    this.userPracticeService
      .updateUserTraningPractice(data)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserPracticeDayData;
        })
      )
      .subscribe({
        next: () => {
          let currenrtPracticeDay = localStorage.getItem('traningDay');
          this.route.navigate([
            `user-traning-details/${currenrtPracticeDay}/${this.userId}`,
          ]);
          localStorage.removeItem('traningDay');
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.bgColorNotification = 'red';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      })
      .add(() => {
        this.startTraning = !!localStorage.getItem('traningDay');
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

  exerciseCurrentRoute(dayId: number | null, exerciseId: number | null): void {
    let currenrtPracticeDay = localStorage.getItem('traningDay');
    this.route.navigate([
      `current-user-traning/${dayId}/${exerciseId}/${currenrtPracticeDay}`,
    ]);
  }

  onStartTraning(): void {
    //  Таймер в разработке
    // this.timerTraningService.start();
    let data = {
      tittle: this.exerciseDayData.tittle,
      start: new Date().toString(),
      end: '',
      userExerciseDayId: this.exerciseDayId,
      duration: '',
      userProfileId: localStorage.getItem('id'),
    };
    this.createUserPracticeDay(data);
  }

  onEndTraning(): void {
    let data = {
      id: localStorage.getItem('traningDay'),
      end: new Date().toString(),
      duration: (
        new Date().getTime() - new Date(this.activeTraningStart).getTime()
      ).toString(),
    };
    this.updateUserPracticeDay(data);

    //  Таймер в разработке
    // this.timerTraningService.stop();
  }

  onActiveTraning(): void {
    this.route.navigate([`current-user-traning/${this.activeTraningId}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
