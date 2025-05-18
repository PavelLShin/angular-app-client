import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/constants';
import { HttpClient } from '@angular/common/http';
import { IUserExercise } from 'src/interfaces/user-exercises/user-exxercises';

@Injectable({
  providedIn: 'root',
})
export class UserExerciseService {
  constructor(private http: HttpClient) {}

  getUserExercises(userExerciseDayId: string | null): Observable<Object> {
    return this.http.get(`${API_URL}/userExercise/${userExerciseDayId}`);
  }

  createUserExercise(data: IUserExercise): Observable<Object> {
    return this.http.post(`${API_URL}/userExercise`, data);
  }

  deleteUserExercises(userExerciseDayId: string | null) {
    return this.http.delete(`${API_URL}/userExercise/${userExerciseDayId}`);
  }
}
