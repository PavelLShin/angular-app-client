import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  IExerciseData,
  IExerciseType,
} from 'src/interfaces/exercise/IExerciseType';
import { IUserData } from 'src/interfaces/user_data/IUserData';
import { ExerciseService } from 'src/services/exercise/exercise.service';
import { UserDataService } from 'src/services/user-data/user-data.service';
import { DeleteExercisesDialogComponent } from '../delete-exercises-dialog/delete-exercises-dialog.component';
import { DialogStateService } from 'src/services/dialog/dialog-state.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  constructor(
    public userDataService: UserDataService,
    public route: Router,
    private exerciseServise: ExerciseService,
    public dialog: MatDialog,
    public dialogService: DialogStateService
  ) {}
  public userRole!: string | null;
  public userId!: string | null;
  private destroy$: Subject<void> = new Subject<void>();
  public errorMessage: string = '';
  public loaderVisible: boolean = false;
  public exerciseType!: IExerciseType[];
  public exercises!: IExerciseData[];
  public currentTypeIndex: number = 0;
  public currentExerciseIndex: number = 0;
  public typeId!: number;
  public isDialogOpen!: boolean;

  public colorBorderType!: string;

  ngOnInit(): void {
    this.getExerciseType();
    this.userId = localStorage.getItem('id');
    this.getUserRole(this.userId);
    this.getStateDialog();
  }

  getStateDialog(): void {
    this.dialogService.$data.subscribe({
      next: (data: boolean) => {
        this.isDialogOpen = data;
      },
    });
  }

  borderColorType(color: string, id: number): void {
    this.colorBorderType = color;
    this.typeId = id;
    this.getExercisesByType(id);
  }

  nextType(): void {
    if (this.currentTypeIndex < this.exerciseType.length - 1) {
      this.currentTypeIndex =
        (this.currentTypeIndex + 1) % this.exerciseType.length;
    }
  }

  prevType(): void {
    if (this.currentTypeIndex > 0) {
      this.currentTypeIndex =
        (this.currentTypeIndex - 1 + this.exerciseType.length) %
        this.exerciseType.length;
    }
  }

  nextExercises(): void {
    if (this.currentExerciseIndex < this.exercises.length - 1) {
      this.currentExerciseIndex =
        (this.currentExerciseIndex + 1) % this.exercises.length;
    }
  }

  prevExercises(): void {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex =
        (this.currentExerciseIndex - 1 + this.exercises.length) %
        this.exercises.length;
    }
  }

  getUserRole(id: string | null): void {
    this.userDataService
      .getUserById(id)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserData;
        })
      )
      .subscribe({
        next: (data: IUserData) => {
          this.userRole = data.role;
        },
      });
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

  deleteExerciseType(data: number): void {
    const dialogRef = this.dialog.open(DeleteExercisesDialogComponent);
    this.dialogService.setDialogState(true);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loaderVisible = true;
        this.exerciseServise
          .deleteType(data)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.getExerciseType();
              this.getExercisesByType(this.typeId);
            },
            error: (error) => {
              this.errorMessage = error.error.message;
            },
          })
          .add(() => {
            this.loaderVisible = false;
          });
      } else {
      }
    });
  }

  deleteExercise(data: number | null): void {
    this.loaderVisible = true;
    this.exerciseServise
      .deleteExrcise(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getExercisesByType(this.typeId);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  exerciseConfigurationRoute(id: number | null): void {
    this.route.navigate([`exercise-configuration/${id}`]);
  }
  exerciseInfoRoute(id: number | null): void {
    this.route.navigate([`exercise-info/${id}`]);
  }

  typeConfugurableRoute(): void {
    this.route.navigate(['/configurable']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
