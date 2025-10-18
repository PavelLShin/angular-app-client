import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BASE_URL } from 'src/env/constants';
import { IRequestIncoming } from 'src/interfaces/user_data/IFriendsInterface';
import { FriendsService } from 'src/services/friends/friends.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  public toUserId: number = Number(localStorage.getItem('id'));
  public incomingRequests$!: Observable<IRequestIncoming[]>;

  public loaderVisible: boolean = false;
  public errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  public bgColorNotification!: string;

  constructor(public friendsService: FriendsService) {}

  ngOnInit(): void {
    this.incomingRequests$ = this.getIncomingRequests(this.toUserId);
  }

  getIncomingRequests(id: number | null): Observable<IRequestIncoming[] | []> {
    this.loaderVisible = true;
    if (id == null) {
      return of([]);
    }
    this.loaderVisible = false;
    return this.friendsService
      .getIncomingRequests(id)
      .pipe(takeUntil(this.destroy$));
  }

  respondToFriendRequest(requestId: number, action: string) {
    this.loaderVisible = true;
    let currentUserId = Number(localStorage.getItem('id'));
    this.friendsService
      .respondToFriendRequest(requestId, action, currentUserId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.errorMessage = `${
            action === 'accept' ? 'Запрос принят' : 'Запрос отклонён'
          }`;
          this.bgColorNotification = 'success';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
        error: () => {
          this.errorMessage = 'Ошибка';
          this.bgColorNotification = 'error';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      })
      .add(() => {
        this.incomingRequests$ = this.getIncomingRequests(this.toUserId);
        this.loaderVisible = false;
        this.friendsService.notifyIncomingRequestsUpdated();
      });
  }

  getImgPath(src: string | null): void | string {
    return `${BASE_URL}:5000/${src}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
