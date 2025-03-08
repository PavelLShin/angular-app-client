import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthenticateService } from 'src/services/authenticate/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
    public authenticateService: AuthenticateService
  ) {}
  public login: boolean = false;
  title = 'athletic-app';

  ngOnInit(): void {
    this.authenticateService.authenticated$.subscribe((isAuthenticated) => {
      this.login = isAuthenticated;
      this.cdr.detectChanges();
    });
  }

  logout(): void {
    this.authenticateService.logout();
    this.authService.logout();
  }
}
