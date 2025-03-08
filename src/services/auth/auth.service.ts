import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/env/constants';
import { IUserData } from 'src/interfaces/user_data/IUserData';
import {
  IUserEmailData,
  IUserIdPasswordData,
  IUserIdPasswordEmailData,
} from 'src/interfaces/user_data/IUserEmailData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registration(data: IUserData): Observable<Object> {
    return this.http.post(`${API_URL}/user/registration`, data);
  }

  login(data: IUserData): Observable<Object> {
    return this.http.post(`${API_URL}/user/login`, data);
  }

  getUserByEmail(data: IUserEmailData): Observable<Object> {
    return this.http.post(`${API_URL}/user/change-password`, data);
  }

  resetPassword(data: IUserIdPasswordData): Observable<Object> {
    return this.http.patch(`${API_URL}/user/change-password`, data);
  }

  changeRegistrationData(data: IUserIdPasswordEmailData): Observable<Object> {
    return this.http.patch(`${API_URL}/user/change-registration-data`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
}
