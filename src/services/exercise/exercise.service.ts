import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private states: string[] = [];
  getState(): string[] {
    return this.states;
  }
  setState(state: string): void {
    this.states.push(state);
  }
  deleteElem(id: number): void {
    this.states.splice(id, 1);
  }
}
