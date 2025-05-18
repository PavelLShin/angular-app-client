import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/env/constants';
import {
  IExerciseData,
  ISetExerciseType,
} from 'src/interfaces/exercise/IExerciseType';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  getType(): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${API_URL}/type`, { headers });
  }

  setType(data: ISetExerciseType): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${API_URL}/type`, data, { headers });
  }

  deleteType(id: number): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${API_URL}/type/${id}`, { headers });
  }

  setExercise(data: IExerciseData | Object): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${API_URL}/exercise`, data, { headers });
  }

  getExercisesByType(typeId: number): Observable<Object> {
    return this.http.get(`${API_URL}/exercise/${typeId}`);
  }

  getOneExercsieById(id: string | null): Observable<Object> {
    return this.http.get(`${API_URL}/exercise/get-one/${id}`);
  }

  changeExerciseInfo(data: IExerciseData | Object): Observable<Object> {
    return this.http.patch(`${API_URL}/exercise`, data);
  }

  deleteExrcise(id: number | null): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${API_URL}/exercise/${id}`, { headers });
  }
}
