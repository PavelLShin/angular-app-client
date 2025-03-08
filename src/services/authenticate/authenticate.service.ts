import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private authenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.isAuthenticated());
  public authenticated$: Observable<boolean> =
    this.authenticatedSubject.asObservable();

  login(): void {
    return this.authenticatedSubject.next(true);
  }

  logout(): void {
    return this.authenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
