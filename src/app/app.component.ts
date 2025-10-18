import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthenticateService } from 'src/services/authenticate/authenticate.service';
import { DialogStateService } from 'src/services/dialog/dialog-state.service';
import { FriendsService } from 'src/services/friends/friends.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public login: boolean = false;
  public isDialogOpen!: boolean;
  public bgColorNotification!: string;
  public errorMessage: string = '';
  public incomingRequestsCount = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
    public authenticateService: AuthenticateService,
    public dialogService: DialogStateService,
    public route: Router,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    this.authenticateService.authenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        this.login = isAuthenticated;
        this.cdr.detectChanges();

        if (isAuthenticated) {
          const userId = Number(localStorage.getItem('id'));
          if (userId) {
            this.loadIncomingRequestsCount(userId);

            this.setupIncomingRequestsListener(userId);
          }
        } else {
          this.incomingRequestsCount = 0;
        }
      });

    this.dialogService.$data
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean) => {
        this.isDialogOpen = data;
      });
  }

  private setupIncomingRequestsListener(userId: number): void {
    this.friendsService.incomingRequestsUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadIncomingRequestsCount(userId);
      });
  }

  private loadIncomingRequestsCount(userId: number): void {
    this.friendsService.getIncomingRequests(userId).subscribe((requests) => {
      this.incomingRequestsCount = requests?.length || 0;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
