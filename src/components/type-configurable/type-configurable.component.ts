import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IExerciseType } from 'src/interfaces/exercise/IExerciseType';
import { ExerciseService } from 'src/services/exercise/exercise.service';

@Component({
  selector: 'app-type-configurable',
  templateUrl: './type-configurable.component.html',
  styleUrls: ['./type-configurable.component.css'],
})
export class TypeConfigurableComponent implements OnInit {
  public setExerciseTypeForm!: FormGroup;
  public createExerciseForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  public loaderVisible: boolean = false;
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public exerciseType!: IExerciseType[];

  constructor(
    public fb: FormBuilder,
    private exerciseServise: ExerciseService
  ) {}

  ngOnInit(): void {
    this.setExerciseTypeForm = this.fb.group({
      tittle: ['', [Validators.required]],
    });

    this.getExerciseType();

    this.createExerciseForm = this.fb.group({
      name: ['', [Validators.required]],
      typeId: [null, [Validators.required]],
      info: ['', [Validators.required]],
      img: [null, [Validators.required]],
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

  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    this.createExerciseForm.patchValue({
      img: file,
    });
  }

  onSubmitExercise(): void {
    this.loaderVisible = true;
    let img = this.createExerciseForm.get('img')?.value;
    const formData = new FormData();
    formData.append('name', this.createExerciseForm.get('name')?.value);
    formData.append('typeId', this.createExerciseForm.get('typeId')?.value);
    formData.append('info', this.createExerciseForm.get('info')?.value);
    formData.append('img', img);

    this.exerciseServise
      .setExercise(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.errorMessage = 'Успешно!';
          this.bgColorNotification = 'success';
          this.createExerciseForm.reset();
        },
        error: () => {
          this.createExerciseForm.reset();
          this.bgColorNotification = 'error';
          this.errorMessage = 'Данное упражнение уже существует';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  onSubmit(): void {
    this.loaderVisible = true;
    this.exerciseServise
      .setType(this.setExerciseTypeForm.value)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IExerciseType[];
        })
      )
      .subscribe({
        next: () => {
          this.errorMessage = 'Успешно!';
          this.bgColorNotification = 'success';
          this.setExerciseTypeForm.reset();
          this.getExerciseType();
        },
        error: (error) => {
          this.bgColorNotification = 'error';
          this.errorMessage = 'Данный тип уже существует';
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
