import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    public dialogService: DialogStateService
  ) {}
  public login: boolean = false;
  public isDialogOpen!: boolean;

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
    this.authenticateService.logout();
    this.authService.logout();
  }
}
