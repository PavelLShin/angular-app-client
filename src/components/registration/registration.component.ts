import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticateService } from 'src/services/authenticate/authenticate.service';
import { ITokenData } from 'src/interfaces/tokens/ITokenData';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  public registerForm!: FormGroup;
  public currentRoute!: string;
  private destroy$: Subject<void> = new Subject<void>();
  public headTxt!: string;
  public passwordIsVisible: boolean = false;
  public errorMessage: string = '';
  public loaderVisible: boolean = false;
  public bgColorNotification!: string;

  constructor(
    public fb: FormBuilder,
    public route: Router,
    public authService: AuthService,
    public authenticateService: AuthenticateService
  ) {}
  ngOnInit(): void {
    this.currentRoute = this.route.url;
    this.headTxt =
      this.currentRoute == '/registration' ? 'Регистрация' : 'Авторизация';

    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', this.confirmPasswordValidators()],
      },
      {
        validators:
          this.currentRoute == '/registration'
            ? this.passwordMatchValidator
            : null,
      }
    );
  }
  confirmPasswordValidators(): Validators | null[] {
    return this.currentRoute == '/registration' ? [Validators.required] : [];
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    this.loaderVisible = true;
    if (this.currentRoute == '/registration') {
      this.authService
        .registration(this.registerForm.value)
        .pipe(takeUntil(this.destroy$))
        .pipe(
          map((data: Object) => {
            return data as ITokenData;
          })
        )
        .subscribe({
          next: () => {
            this.route.navigate(['/auth']);
          },
          error: (error) => {
            this.registerForm.reset();
            this.bgColorNotification = 'error';
            this.errorMessage = error.error.message;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          },
        })
        .add(() => {
          this.loaderVisible = false;
        });
    }
    if (this.currentRoute == '/auth') {
      this.authService
        .login(this.registerForm.value)
        .pipe(takeUntil(this.destroy$))
        .pipe(
          map((data: Object) => {
            return data as ITokenData;
          })
        )
        .subscribe({
          next: (tokens: ITokenData) => {
            localStorage.setItem('id', tokens.id);
            localStorage.setItem('token', tokens.token);
            this.route.navigate(['']);
            this.authenticateService.login();
          },
          error: (error) => {
            this.registerForm.reset();
            this.bgColorNotification = 'error';
            this.errorMessage =
              error.error.message == 'Указан не верный пароль'
                ? 'Указан неверный пароль'
                : error.error.message;
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

  routerBtn(): void {
    if (this.currentRoute == '/registration') {
      this.route.navigate(['/auth']);
    }
    if (this.currentRoute == '/auth') {
      this.route.navigate(['/registration']);
    }
  }

  resetBtn(): void {
    this.route.navigate(['/reset-password']);
  }

  toggleVisibilePassword(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
