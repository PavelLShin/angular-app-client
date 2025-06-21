import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/constants';
import { HttpClient } from '@angular/common/http';

import { IUserExerciseDay } from 'src/interfaces/user-exercise-day/IUserExerciseDay';

@Injectable({
  providedIn: 'root',
})
export class UserExercisePracticeService {
  constructor(private http: HttpClient) {}

  createUserExercisePractice(data: IUserExerciseDay): Observable<Object> {
    return this.http.post(`${API_URL}/userExercisePractice`, data);
  }

  getOneExerciseTraning(
    userTraningPracticeId: string | null,
    exerciseId: string | null
  ): Observable<Object> {
    return this.http.get(
      `${API_URL}/userExercisePractice/${userTraningPracticeId}/${exerciseId}`
    );
  }

  getExerciseTraningDay(
    userTraningPracticeId: string | null
  ): Observable<Object> {
    return this.http.get(
      `${API_URL}/userExercisePractice/${userTraningPracticeId}`
    );
  }

  changeUserExercisePracticeData(data: IUserExerciseDay) {
    return this.http.patch(`${API_URL}/userExercisePractice`, data);
  }
}
