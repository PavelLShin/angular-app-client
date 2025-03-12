import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUserIdPasswordEmailData } from 'src/interfaces/user_data/IUserEmailData';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-change-registration-data',
  templateUrl: './change-registration-data.component.html',
  styleUrls: ['./change-registration-data.component.css'],
})
export class ChangeRegistrationDataComponent implements OnInit {
  public changeRegisterDataForm!: FormGroup;
  public passwordIsVisible: boolean = false;
  public changePassword: boolean = false;
  public userRegisterData!: IUserIdPasswordEmailData;
  public userId!: string | null;
  public errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  public bgColorNotification!: string;

  constructor(
    public fb: FormBuilder,
    public route: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.changeRegisterDataForm = this.fb.group({
      email: ['', [Validators.email]],
      currentPassword: ['', this.passwordValidators()],
      password: ['', this.passwordValidators()],
    });

    this.userId = localStorage.getItem('id');
  }

  passwordValidators(): ValidatorFn | ValidatorFn[] | null {
    return this.changePassword
      ? [Validators.required, Validators.minLength(5)]
      : [];
  }

  updateValidators(): void {
    const currentPasswordControl =
      this.changeRegisterDataForm.get('currentPassword');
    const passwordControl = this.changeRegisterDataForm.get('password');

    if (currentPasswordControl) {
      currentPasswordControl.setValidators(this.passwordValidators());
      currentPasswordControl.updateValueAndValidity();
    }
    if (passwordControl) {
      passwordControl.setValidators(this.passwordValidators());
      passwordControl.updateValueAndValidity();
    }
  }

  toggleVisibilePassword(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  onSubmit(): void {
    this.authService
      .changeRegistrationData({
        id: this.userId,
        email: this.changeRegisterDataForm.value.email,
        password: this.changeRegisterDataForm.value.password,
        currentPassword: this.changeRegisterDataForm.value.currentPassword,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.errorMessage = 'Успешно!';
          this.bgColorNotification = 'success';
          setTimeout(() => {
            this.errorMessage = '';
            this.route.navigate(['/']);
          }, 1000);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.bgColorNotification = 'error';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      });
  }

  toggleChangePassword(): void {
    this.changePassword = !this.changePassword;
    this.updateValidators();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
