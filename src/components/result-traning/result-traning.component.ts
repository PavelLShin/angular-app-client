import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserExerciseDay } from 'src/interfaces/user-exercise-day/IUserExerciseDay';
import { IUserPracticeDayData } from 'src/interfaces/user-practice-day/IUserPracticeDay';
import { UserExercisePracticeService } from 'src/services/userExercisePractice/user-exercise-practice.service';
import { UserTraningPracticeService } from 'src/services/userTraningPractice/user-traning-practice.service';

@Component({
  selector: 'app-result-traning',
  templateUrl: './result-traning.component.html',
  styleUrls: ['./result-traning.component.css'],
})
export class ResultTraningComponent implements OnInit {
  public traningResult!: string;
  public destroy$: Subject<void> = new Subject<void>();
  public loaderVisible: boolean = false;
  public currentPracticeDayId!: string | null;
  public currentUserPracticeData!: IUserPracticeDayData;
  public userExerciseDayId!: string | null;
  public userExerciseDayData!: IUserExerciseDay[];

  constructor(
    private userTraningPracticeService: UserTraningPracticeService,
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public userExercisePracticeService: UserExercisePracticeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.currentPracticeDayId = params.get('currentPracticeDay');
      this.getCurrentTraningData(this.currentPracticeDayId);
    });
  }

  getCurrentTraningData(id: string | null) {
    this.loaderVisible = true;
    this.userTraningPracticeService
      .getUserTraning(id)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserPracticeDayData;
        })
      )
      .subscribe({
        next: (data: IUserPracticeDayData) => {
          this.currentUserPracticeData = data;
          this.userExerciseDayId = data.id;
          this.getUserExercise(this.userExerciseDayId);
          let timestamp =
            new Date(data.end).getTime() - new Date(data.start).getTime();
          let totalSeconds = Math.floor(timestamp / 1000);
          let hours = Math.floor(totalSeconds / 3600);
          let minutes = Math.floor((totalSeconds % 3600) / 60);
          let seconds = totalSeconds % 60;
          this.traningResult = `${hours >= 10 ? hours : `0${hours} :`} ${
            minutes >= 10 ? minutes : `0${minutes}`
          } : ${seconds >= 10 ? seconds : `0${seconds}`}`;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  getUserExercise(id: string | null): void {
    this.loaderVisible = true;
    this.userExercisePracticeService
      .getExerciseTraningDay(id)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserExerciseDay[];
        })
      )
      .subscribe({
        next: (data: IUserExerciseDay[]) => {
          this.userExerciseDayData = this.parseExerciseData(data);
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  parseExerciseData(data: IUserExerciseDay[]): IUserExerciseDay[] {
    let result = data.map((elem: any) => {
      let {
        id,
        name,
        dataPractice,
        dataArray,
        exerciseId,
        userTraningPracticeId,
      } = elem;
      return {
        exerciseId,
        userTraningPracticeId,
        id,
        name,
        dataPractice,
        dataArray: dataArray.map((elem: string) => JSON.parse(elem)),
      };
    });
    return result;
  }

  goBack(): void {
    this.route.navigate([`/home`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
