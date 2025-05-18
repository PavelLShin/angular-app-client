import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogStateService {
  public dialogState = new BehaviorSubject<boolean>(false);
  $data = this.dialogState.asObservable();
  constructor() {}

  setDialogState(data: boolean): void {
    this.dialogState.next(data);
  }
}
