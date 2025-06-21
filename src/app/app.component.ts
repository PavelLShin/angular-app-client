import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthenticateService } from 'src/services/authenticate/authenticate.service';
import { DialogStateService } from 'src/services/dialog/dialog-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
    public authenticateService: AuthenticateService,
    public dialogService: DialogStateService,
    public route: Router
  ) {}
  public login: boolean = false;
  public isDialogOpen!: boolean;
  public bgColorNotification!: string;
  public errorMessage: string = '';

  title = 'athletic-app';

  ngOnInit(): void {
    this.authenticateService.authenticated$.subscribe((isAuthenticated) => {
      this.login = isAuthenticated;
      this.cdr.detectChanges();
    });
    this.getStateDialog();
  }

  getStateDialog(): void {
    this.dialogService.$data.subscribe({
      next: (data: boolean) => {
        this.isDialogOpen = data;
      },
    });
  }

  logout(): void {
    if (localStorage.getItem('traningDay')) {
      this.errorMessage = 'Завершите активную тренировку';
      this.bgColorNotification = 'error';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    } else {
      this.authenticateService.logout();
      this.authService.logout();
      this.route.navigate([`auth`]);
    }
  }
}
