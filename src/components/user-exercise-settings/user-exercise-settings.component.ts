import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserTraning } from 'src/interfaces/user-traning/user-traning';
import { UserTraningService } from 'src/services/user-traning/user-traning.service';
import {
  IExerciseData,
  IExerciseType,
} from 'src/interfaces/exercise/IExerciseType';
import { ExerciseService } from 'src/services/exercise/exercise.service';
import { UserExerciseService } from 'src/services/user-exercise/user-exercise.service';
import { IUserExercise } from 'src/interfaces/user-exercises/user-exxercises';

@Component({
  selector: 'app-user-exercise-settings',
  templateUrl: './user-exercise-settings.component.html',
  styleUrls: ['./user-exercise-settings.component.css'],
})
export class UserExerciseSettingsComponent implements OnInit {
  public destroy$: Subject<void> = new Subject<void>();
  public exerciseDayId!: string | null;
  public exerciseDayData!: IUserTraning;
  public loaderVisible: boolean = false;
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public exerciseType!: IExerciseType[];
  public exercises!: IExerciseData[];
  public currentTypeIndex: number = 0;
  public currentExerciseIndex: number = 0;
  public typeId!: number;
  public colorBorderType!: string;
  public isSaving: boolean = false;
  public exerciseUser!: IUserExercise[];

  public pageUserId!: string | null;

  constructor(
    private userExerciseService: UserExerciseService,
    private userExerciseDayService: UserTraningService,
    public activatedRoute: ActivatedRoute,
    public route: Router,
    private exerciseServise: ExerciseService
  ) {}

  ngOnInit(): void {
    this.getUserIdInfo();
    this.getExerciseType();
    this.getExerciseDayId();
  }

  getUserIdInfo(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.pageUserId = params.get('userId');
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

  changeUserExercise(id: number | null, name: string | null): void {
    const existingExerciseIndex = this.exerciseUser.findIndex(
      (el) => el.exerciseId === id
    );

    if (existingExerciseIndex !== -1) {
      this.exerciseUser.splice(existingExerciseIndex, 1);
    } else {
      this.exerciseUser.push({
        name: name,
        userExerciseDayId: Number(this.exerciseDayId),
        exerciseId: id,
      });
    }
  }

  createUserExercise(
    name: string | null,
    userExerciseDayId: number | null,
    exerciseId: number | null
  ): void {
    this.loaderVisible = true;
    this.userExerciseService
      .createUserExercise({
        name,
        userExerciseDayId,
        exerciseId,
      })
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

  deleteUserExercise(userExerciseDayId: string | null): void {
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
  async save(): Promise<void> {
    if (this.isSaving || !this.exerciseDayId) return;
    this.isSaving = true;
    this.loaderVisible = true;
    this.errorMessage = '';
    this.bgColorNotification = '';

    try {
      await this.userExerciseService
        .deleteUserExercises(this.exerciseDayId)
        .toPromise();

      for (const el of this.exerciseUser) {
        await this.userExerciseService
          .createUserExercise({
            name: el.name,
            userExerciseDayId: el.userExerciseDayId,
            exerciseId: el.exerciseId,
          })
          .toPromise();
      }

      this.errorMessage = 'Успешно';
      this.bgColorNotification = 'success';

      setTimeout(() => {
        this.route.navigate([
          `/user-exercise-info/${this.exerciseDayId}/${this.pageUserId}`,
        ]);
        this.isSaving = false;
        this.loaderVisible = false;
        this.errorMessage = '';
      }, 1000);
    } catch (error: any) {
      const message = error?.error?.message || 'Ошибка при сохранении данных';
      this.errorMessage = message;
      this.bgColorNotification = 'error';
      this.isSaving = false;
      this.loaderVisible = false;
    }
  }

  compareExercise(id: number | null): boolean {
    let compare = this.exerciseUser.findIndex((el) => el.exerciseId === id);
    if (compare == -1) {
      return false;
    } else return true;
  }

  getExerciseDayId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.exerciseDayId = params.get('id');
      this.getUserTraningDay(this.exerciseDayId);
      this.getUserExercises(this.exerciseDayId);
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

  borderColorType(color: string, id: number): void {
    this.colorBorderType = color;
    this.typeId = id;
    this.getExercisesByType(id);
  }

  getExerciseType(): void {
    this.loaderVisible = true;
    this.exerciseServise
      .getType()
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IExerciseType[];
        })
      )
      .subscribe({
        next: (data: IExerciseType[]) => {
          this.exerciseType = data;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  getExercisesByType(typeId: number): void {
    this.loaderVisible = true;
    this.exerciseServise
      .getExercisesByType(typeId)
      .pipe(
        map((data: Object) => {
          return data as IExerciseData[];
        })
      )
      .subscribe({
        next: (data: IExerciseData[]) => {
          this.exercises = data;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  exerciseInfoRoute(id: number | null): void {
    this.route.navigate([`exercise-info/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
