import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Login } from '../login/models/login';
import { Result } from '../../shared/models/result';
import { LoginResponse } from '../login/models/login-response';
import { LoggedInUser } from '../login/models/logged-in-user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  calledRequests = [];
  
  constructor(private apiHlpr: HttpService) { }

  login = (obj: Login): Observable<Result<LoginResponse>> => {
    return this.apiHlpr.post<Result<LoginResponse>>('Account/Login', obj);

  }

  setUser = (accessToken: string): void => localStorage.setItem("_accessToken", accessToken);

  isLoggedIn = (): boolean => !!localStorage.getItem("_accessToken");

  getUser = (): LoggedInUser | null => this.isLoggedIn() ? (this.decodeToken()) as unknown as LoggedInUser : null;

  decodeToken = () =>
    this.isLoggedIn() ? jwtDecode(this.getAccessToken()!) as LoggedInUser : null;

  getAccessToken = (): string | null => localStorage.getItem("_accessToken");

}
