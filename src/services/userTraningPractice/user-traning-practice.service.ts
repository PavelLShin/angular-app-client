import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/constants';
import { HttpClient } from '@angular/common/http';
import {
  IUpdatePracticeDayData,
  IUserPracticeDay,
} from 'src/interfaces/user-practice-day/IUserPracticeDay';

@Injectable({
  providedIn: 'root',
})
export class UserTraningPracticeService {
  constructor(private http: HttpClient) {}

  createUserTraningPractice(data: IUserPracticeDay): Observable<Object> {
    return this.http.post(`${API_URL}/userTraningPractice`, data);
  }

  getUserTraning(id: string | null): Observable<Object> {
    return this.http.get(`${API_URL}/userTraningPractice/${id}`);
  }

  updateUserTraningPractice(data: IUpdatePracticeDayData): Observable<Object> {
    return this.http.patch(`${API_URL}/userTraningPractice`, data);
  }
}
