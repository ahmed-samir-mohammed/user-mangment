import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { User } from '../module/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User> {
    return this.http.get<User>(`${env.API_URL}/data`);
  }

  addNewUser(body: User): Observable<User> {
    return this.http.post<User>(`${env.API_URL}/data`, body);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${env.API_URL}/data/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${env.API_URL}/data/${id}`);
  }

  editUser(id: number, body: User): Observable<User> {
    return this.http.put<User>(`${env.API_URL}/data/${id}`, body);
  }
}
