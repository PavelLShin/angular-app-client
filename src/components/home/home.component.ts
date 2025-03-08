import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IUserProfileData } from 'src/interfaces/user_data/IUserProfileData';
import { UserDataService } from 'src/services/user-data/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userData!: IUserProfileData;
  public userId!: string | null;
  public errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  public loaderVisible: boolean = false;

  constructor(public userDataService: UserDataService, public route: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');

    this.getUserInfo(this.userId);
  }

  getImgPath(): void | string {
    return `http://localhost:5000/${this.userData.img}`;
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
          this.getFullYear();
          if (this.userData == null) {
            this.onChangeUserData();
          }
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
    return `${age}`;
  }

  getGender(): string {
    if (this.userData.gender === 'male') {
      return 'M';
    } else return 'Ж';
  }

  onChangeUserData(): void {
    this.route.navigate(['/change-user-data']);
  }

  onChangeRegistrationData(): void {
    this.route.navigate(['/change-registration-data']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
