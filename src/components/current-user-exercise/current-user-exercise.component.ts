import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IExerciseData } from 'src/interfaces/exercise/IExerciseType';
import {
  IExerciseBySets,
  IGetUserExerciseDay,
  IUserExerciseDay,
} from 'src/interfaces/user-exercise-day/IUserExerciseDay';
import { ExerciseService } from 'src/services/exercise/exercise.service';
import { UserExercisePracticeService } from 'src/services/userExercisePractice/user-exercise-practice.service';

@Component({
  selector: 'app-current-user-exercise',
  templateUrl: './current-user-exercise.component.html',
  styleUrls: ['./current-user-exercise.component.css'],
})
export class CurrentUserExerciseComponent implements OnInit {
  public traningDayId!: string | null;
  public exerciseId!: string | null;
  public currentPracticeDayId!: string | null;
  public exerciseData!: IExerciseData;
  private destroy$: Subject<void> = new Subject<void>();
  public loaderVisible: boolean = false;
  public exerciseForm!: FormGroup;
  public sets: IExerciseBySets[] = [];
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public setsApi!: IExerciseBySets[];
  public settingItem: boolean = false;
  public setsItemId!: number;

  constructor(
    public route: Router,
    public activateRoute: ActivatedRoute,
    private exerciseServise: ExerciseService,
    private fb: FormBuilder,
    private userExercisePracticeService: UserExercisePracticeService
  ) {}

  ngOnInit(): void {
    this.getExerciseData();
    this.exerciseForm = this.fb.group({
      practice: ['', [Validators.required]],
      weigth: ['', [Validators.required]],
    });
  }

  getExerciseData(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      this.traningDayId = params.get('dayId');
      this.exerciseId = params.get('exerciseId');
      this.currentPracticeDayId = params.get('currentPracticeDay');
      this.getExerciseDataById(this.exerciseId);
    });
    this.getUserExercisePractice(this.currentPracticeDayId, this.exerciseId);
  }

  getUserExercisePractice(
    currentPracticeDay: string | null,
    exerciseId: string | null
  ): void {
    this.loaderVisible = true;
    this.userExercisePracticeService
      .getOneExerciseTraning(currentPracticeDay, exerciseId)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IGetUserExerciseDay;
        })
      )
      .subscribe({
        next: (data: IGetUserExerciseDay) => {
          if (data) {
            let res = JSON.parse(JSON.stringify(data.dataArray));
            this.setsApi = res.map((el: string) => JSON.parse(el));
            this.sets = this.setsApi;
          }
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
        this.loaderVisible = false;
      });
  }

  setUserExercisePractice(): void {
    this.loaderVisible = true;
    let data = {
      name: this.exerciseData.name,
      dataArray: this.sets,
      dataPractice: new Date().toString(),
      userTraningPracticeId: this.currentPracticeDayId,
      exerciseId: this.exerciseId,
    };
    this.userExercisePracticeService
      .createUserExercisePractice(data)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserExerciseDay;
        })
      )
      .subscribe({
        next: () => {
          this.errorMessage = 'Успешно!';
          this.bgColorNotification = 'success';
          setTimeout(() => {
            this.errorMessage = '';
            this.route.navigate([`/current-user-traning/${this.traningDayId}`]);
          }, 1000);
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
        this.loaderVisible = false;
      });
  }

  updateUserExercisePractice(): void {
    this.loaderVisible = true;
    let data = {
      dataArray: this.sets,
      dataPractice: new Date().toString(),
      userTraningPracticeId: this.currentPracticeDayId,
      exerciseId: this.exerciseId,
    };
    this.userExercisePracticeService
      .changeUserExercisePracticeData(data)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserExerciseDay;
        })
      )
      .subscribe({
        next: () => {
          this.errorMessage = 'Успешно!';
          this.bgColorNotification = 'success';
          setTimeout(() => {
            this.errorMessage = '';
            this.route.navigate([`/current-user-traning/${this.traningDayId}`]);
          }, 1000);
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
        this.loaderVisible = false;
      });
  }

  deleteItem(id: number): void {
    this.sets.splice(id, 1);
  }

  getExerciseDataById(id: string | null): void {
    this.loaderVisible = true;
    this.exerciseServise
      .getOneExercsieById(id)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IExerciseData;
        })
      )
      .subscribe({
        next: (data: IExerciseData) => {
          this.exerciseData = data;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  onSubmit(): void {
    if (!this.settingItem) {
      this.sets.push({
        practice: this.exerciseForm.value.practice,
        weigth: this.exerciseForm.value.weigth,
        dateExercise: new Date().toString(),
      });
      this.exerciseForm.reset();
    } else if (this.settingItem) {
      let data = {
        practice: this.exerciseForm.value.practice,
        weigth: this.exerciseForm.value.weigth,
        dateExercise: this.sets[this.setsItemId].dateExercise,
      };
      this.sets.splice(this.setsItemId, 1, data);
      this.settingItem = false;
      this.exerciseForm.reset();
    }
  }

  changeSetsItem(data: IExerciseBySets, id: number): void {
    this.settingItem = true;
    this.exerciseForm.patchValue({
      practice: data.practice,
      weigth: data.weigth,
    });
    this.setsItemId = id;
  }

  goBack(): void {
    this.route.navigate([`/current-user-traning/${this.traningDayId}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
