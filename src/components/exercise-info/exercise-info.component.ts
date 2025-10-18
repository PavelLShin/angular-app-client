import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BASE_URL } from 'src/env/constants';
import { IExerciseData } from 'src/interfaces/exercise/IExerciseType';
import { ExerciseService } from 'src/services/exercise/exercise.service';

@Component({
  selector: 'app-exercise-info',
  templateUrl: './exercise-info.component.html',
  styleUrls: ['./exercise-info.component.css'],
})
export class ExerciseInfoComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  public exerciseId!: string | null;
  public exerciseData!: IExerciseData;
  public loaderVisible: boolean = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    private exerciseServise: ExerciseService
  ) {}

  ngOnInit(): void {
    this.getExerciseId();
  }

  getImgPath(): void | string {
    return `${BASE_URL}:5000/${this.exerciseData.img}`;
  }

  getExerciseId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.exerciseId = params.get('id');
      this.getExerciseDataById(this.exerciseId);
    });
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
