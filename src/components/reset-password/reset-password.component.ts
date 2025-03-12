import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm!: FormGroup;
  public visibleCode: boolean = false;
  public passwordIsVisible: boolean = false;
  public formVisible: boolean = false;
  public code!: string;
  public email: string = '';
  public errorMessage: string = '';
  public userId!: number;
  private destroy$: Subject<void> = new Subject<void>();
  public bgColorNotification!: string;

  constructor(
    public fb: FormBuilder,
    public route: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  toggleVisibleCode(): void {
    this.authService
      .getUserByEmail({ email: this.email })
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((data: Object) => {
          return data as number;
        })
      )
      .subscribe({
        next: (data: number) => {
          this.userId = data;
          this.visibleCode = true;
          this.errorMessage = '1111';
          this.bgColorNotification = 'succsess';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
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

  toggleVisibilePassword(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  setCode(value: string): void {
    this.code = value;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  getCode(): void {
    if (this.code != '1111') {
      this.errorMessage = 'Код введён не верно';
      this.bgColorNotification = 'error';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    } else {
      this.formVisible = true;
    }
  }

  onSubmit(): void {
    this.authService
      .resetPassword({
        id: this.userId,
        password: this.resetPasswordForm.value.password,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.errorMessage = 'Успешно!';
          this.bgColorNotification = 'success';
          setTimeout(() => {
            this.errorMessage = '';
            this.route.navigate(['/auth']);
          }, 1000);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
