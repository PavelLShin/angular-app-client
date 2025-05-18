import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserProfileData } from 'src/interfaces/user_data/IUserProfileData';
import { UserDataService } from 'src/services/user-data/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-user-data',
  templateUrl: './change-user-data.component.html',
  styleUrls: ['./change-user-data.component.css'],
})
export class ChangeUserDataComponent implements OnInit {
  public userDataForm!: FormGroup;
  public userData!: IUserProfileData;
  public userId!: string | null;
  public errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  public loaderVisible: boolean = false;
  public currentRoute!: string;
  public bgColorNotification!: string;

  constructor(
    public userDataService: UserDataService,
    public fb: FormBuilder,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.currentRoute = this.route.url;
    this.getUserInfo(this.userId);

    this.userDataForm = this.fb.group({
      name: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      age: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      height: ['', [Validators.required]],
      img: [null, [Validators.required]],
    });
  }

  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    this.userDataForm.patchValue({
      img: file,
    });
  }

  getImgPath(): void | string {
    return `http://localhost:5000/${this.userData.img}`;
  }

  onSubmit(): void {
    this.loaderVisible = true;
    let img = this.userDataForm.get('img')?.value;
    const formData = new FormData();
    formData.append('name', this.userDataForm.get('name')?.value);
    formData.append('nickname', this.userDataForm.get('nickname')?.value);
    formData.append('age', this.userDataForm.get('age')?.value);
    formData.append('surname', this.userDataForm.get('surname')?.value);
    formData.append('weight', this.userDataForm.get('weight')?.value);
    formData.append('gender', this.userDataForm.get('gender')?.value);
    formData.append('height', this.userDataForm.get('height')?.value);
    formData.append('img', img);
    formData.append('userId', `${this.userId}`);
    if (this.userData) {
      this.userDataService
        .changeUserData(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.errorMessage = 'Успешно';
            this.bgColorNotification = 'success';
            setTimeout(() => {
              this.userDataForm.reset();
              this.getUserInfo(this.userId);
              this.route.navigate(['/home']);
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
    } else {
      this.userDataService
        .setUserData(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.errorMessage = 'Успешно';
            this.bgColorNotification = 'success';
            setTimeout(() => {
              this.errorMessage = '';
              this.userDataForm.reset();
              this.getUserInfo(this.userId);
              this.route.navigate(['/home']);
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
  }

  getUserInfo(id: string | null): void {
    this.loaderVisible = true;
    this.userDataService
      .getUserData(id)
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as IUserProfileData;
        })
      )
      .subscribe({
        next: (data: IUserProfileData) => {
          this.userData = data;
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }
  getFullYear(): string {
    const birthDate = new Date(this.userData?.age);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const thisYearBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    if (today < thisYearBirthday) {
      age--;
    }
    return `Возраст: ${age} `;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
