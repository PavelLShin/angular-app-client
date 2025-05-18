import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/constants';
import { IUserTraning } from 'src/interfaces/user-traning/user-traning';

@Injectable({
  providedIn: 'root',
})
export class UserTraningService {
  constructor(private http: HttpClient) {}

  setUserTraning(data: IUserTraning): Observable<Object> {
    return this.http.post(`${API_URL}/userExerciseDay`, data);
  }

  getUserTraning(userId: string | null): Observable<Object> {
    return this.http.get(`${API_URL}/userExerciseDay/${userId}`);
  }

  getOneUserTraning(id: string | null): Observable<Object> {
    return this.http.get(`${API_URL}/userExerciseDay/day/${id}`);
  }

  deleteUserTraning(id: number): Observable<Object> {
    return this.http.delete(`${API_URL}/userExerciseDay/${id}`);
  }
}
