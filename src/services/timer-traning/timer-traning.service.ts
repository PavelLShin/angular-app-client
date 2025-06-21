import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerTraningService {
  private activeTraningSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public stateTraning$: Observable<boolean> =
    this.activeTraningSubject.asObservable();

  start(): void {
    return this.activeTraningSubject.next(true);
  }

  stop(): void {
    return this.activeTraningSubject.next(false);
  }
}
