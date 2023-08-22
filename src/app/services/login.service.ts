import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Token } from '../models/Token';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://rrlibrary.azurewebsites.net/api/';

  constructor(private http: HttpClient) {} 

  
  login(name: string, password: string): Observable<HttpResponse<Token>> {
    const url = this.apiUrl + 'Users/Login';
    const body = {
      Name: name,
      Password: password,
    };
    return this.http.post<Token>(url, body, { observe: 'response' });
  }

  createUser(user: User): Observable<HttpResponse<User>> {
    const url = this.apiUrl + 'Users';
    return this.http.post<User>(url, user, { observe: 'response' });
  }


}
