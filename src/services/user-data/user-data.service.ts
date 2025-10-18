import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/constants';
import {
  ISearchUserResult,
  IUserProfileData,
} from 'src/interfaces/user_data/IUserProfileData';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUserById(id: string | null): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${API_URL}/user/${id}`, { headers });
  }

  getUserData(id: string | null): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${API_URL}/userData/${id}`, { headers });
  }

  setUserData(data: IUserProfileData | Object) {
    return this.http.post(`${API_URL}/userData`, data);
  }

  changeUserData(data: IUserProfileData | Object) {
    return this.http.patch(`${API_URL}/userData`, data);
  }

  searchUser(term: string): Observable<ISearchUserResult[]> {
    if (!term.trim()) {
      return new Observable((observer) => observer.next([]));
    }
    return this.http.get<ISearchUserResult[]>(
      `${API_URL}/userData/search?q=${term}`
    );
  }
}
