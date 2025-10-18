import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { BASE_URL } from 'src/env/constants';
import {
  IFreindsData,
  ISearchFriendsInterface,
} from 'src/interfaces/user_data/IFriendsInterface';
import { IUserData } from 'src/interfaces/user_data/IUserData';
import { FriendsService } from 'src/services/friends/friends.service';
import { UserDataService } from 'src/services/user-data/user-data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  public userDataId!: number;
  public searchFriendsForm!: FormGroup;

  private searchResultsSubject = new BehaviorSubject<ISearchFriendsInterface[]>(
    []
  );
  public searchResults$ = this.searchResultsSubject.asObservable();
  public friends$!: Observable<IFreindsData[]>;
  public currentUserId = localStorage.getItem('id');

  public loaderVisible: boolean = false;
  public errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  public bgColorNotification!: string;

  constructor(
    public fb: FormBuilder,
    public searchUserService: UserDataService,
    public userDataService: UserDataService,
    public friendsServise: FriendsService,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.friends$ = this.getFriends(Number(localStorage.getItem('id')));
    this.getUserId();
    this.searchFriendsForm = this.fb.group({
      nickname: ['', [Validators.required]],
    });

    this.searchFriendsForm
      .get('nickname')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.searchUserService.searchUser(term || '')),
        switchMap((users) => {
          const currentUserId = Number(localStorage.getItem('id'));
          if (!currentUserId) return of(users);

          const requests = users.map((user) => {
            if (user.userId === currentUserId) {
              return of({ ...user, friendStatus: 'self' });
            }
            return this.friendsServise
              .checkFriendsRequest(Number(user.userId), currentUserId)
              .pipe(
                map((res) => ({ ...user, friendStatus: res.status })),
                catchError(() => of({ ...user, friendStatus: 'none' }))
              );
          });
          return forkJoin(requests);
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.searchResultsSubject.next(users);
      });
  }

  getImgPath(src: string | null): void | string {
    return `${BASE_URL}:5000/${src}`;
  }

  getFullYear(birth: string): string {
    const birthDate = new Date(birth);
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

  getUserId(): void {
    this.userDataService
      .getUserById(this.currentUserId)
      .pipe(
        takeUntil(this.destroy$),
        map((data: Object) => {
          return data as IUserData;
        })
      )
      .subscribe({
        next: (data: IUserData) => {
          this.userDataId = data.id;
        },
      });
  }

  sendFriendsRequest(userId: number | null): void {
    this.loaderVisible = true;
    const currentResults = this.searchResultsSubject.value;
    const updatedResults = currentResults.map((user) =>
      user.userId === userId ? { ...user, friendStatus: 'i_sent' } : user
    );
    this.searchResultsSubject.next(updatedResults);
    this.friendsServise
      .sendFriendsRequest(userId, this.userDataId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.errorMessage = 'Запрос отправлен';
          this.bgColorNotification = 'success';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
        error: () => {
          const rollbackResults = this.searchResultsSubject.value.map((user) =>
            user.userId === userId ? { ...user, friendStatus: 'none' } : user
          );
          this.searchResultsSubject.next(rollbackResults);
        },
      })
      .add(() => {
        this.loaderVisible = false;
      });
  }

  getFriends(userId: number): Observable<IFreindsData[]> {
    if (userId == null) {
      return of([]);
    }
    return this.friendsServise.getFriends(userId);
  }

  removeFriends(friendId: number | null): void {
    this.loaderVisible = true;
    let userId = Number(this.currentUserId);
    this.friendsServise
      .removeFriends(userId, friendId)
      .pipe(
        takeUntil(this.destroy$),
        map((data: Object) => {
          return data as Object;
        })
      )
      .subscribe({
        next: () => {
          this.errorMessage = 'Пользователь удалён';
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
        this.searchResultsSubject.next([]);
        this.friends$ = this.getFriends(Number(localStorage.getItem('id')));
        this.loaderVisible = false;
      });
  }

  onSubmit(): void {}

  goRequestList(): void {
    this.route.navigate([`request`]);
  }

  onUserTraning(id: number | null): void {
    this.route.navigate([`user-traning/${id}`]);
  }

  onUserCalendar(id: number | null): void {
    this.route.navigate([`/calendar/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
