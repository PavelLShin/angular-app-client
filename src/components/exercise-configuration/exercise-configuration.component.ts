import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BASE_URL } from 'src/env/constants';
import {
  IExerciseData,
  IExerciseType,
} from 'src/interfaces/exercise/IExerciseType';
import { ExerciseService } from 'src/services/exercise/exercise.service';

@Component({
  selector: 'app-exercise-configuration',
  templateUrl: './exercise-configuration.component.html',
  styleUrls: ['./exercise-configuration.component.css'],
})
export class ExerciseConfigurationComponent implements OnInit {
  public exerciseId!: string | null;
  private destroy$: Subject<void> = new Subject<void>();
  public exerciseData!: IExerciseData;
  public changeExerciseForm!: FormGroup;
  public loaderVisible: boolean = false;
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public exerciseType!: IExerciseType[];

  constructor(
    public activatedRoute: ActivatedRoute,
    private exerciseServise: ExerciseService,
    public fb: FormBuilder,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.getExerciseId();

    this.getExerciseType();

    this.changeExerciseForm = this.fb.group({
      name: ['', [Validators.required]],
      typeId: [null, [Validators.required]],
      info: ['', [Validators.required]],
      img: [null, [Validators.required]],
    });
  }

  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    this.changeExerciseForm.patchValue({
      img: file,
    });
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
      });
  }

  getExerciseType(): void {
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
      });
  }

  onSubmitChangeExercise(): void {
    this.loaderVisible = true;
    let img = this.changeExerciseForm.get('img')?.value;
    let id = this.exerciseId?.toString();

    const formData = new FormData();
    formData.append('name', this.changeExerciseForm.get('name')?.value);
    formData.append('info', this.changeExerciseForm.get('info')?.value);
    if (this.changeExerciseForm.get('typeId')?.value == null) {
      formData.append('typeId', `${this.exerciseData.typeId}`);
    } else {
      formData.append('typeId', this.changeExerciseForm.get('typeId')?.value);
    }
    formData.append('id', `${id}`);
    formData.append('img', img);

    this.exerciseServise
      .changeExerciseInfo(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.errorMessage = 'Успешно';
          this.bgColorNotification = 'success';
          setTimeout(() => {
            this.changeExerciseForm.reset();
            this.route.navigate(['/exercise']);
            this.errorMessage = '';
          }, 1000);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.bgColorNotification = 'error';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
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
