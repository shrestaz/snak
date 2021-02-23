import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  username: string;
  password: string;
}
export interface UserSignUp extends User {
  confirmPassword: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  username: string;
}

export interface SignUpResponse {
  success?: boolean;
  username?: string;
  error?: string;
}

export interface LoginResponse {
  error?: string;
  success?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  signUpResponse = new BehaviorSubject<SignUpResponse>({ success: false });
  loginResponse = new BehaviorSubject<LoginResponse>({ success: false });
  username = new BehaviorSubject(this.usernameFromResponse);

  set usernameFromResponse(value) {
    this.username.next(value);
    if (value) {
      localStorage.setItem('username', value);
    }
  }

  get usernameFromResponse() {
    return localStorage.getItem('username');
  }

  get accessToken() {
    return localStorage.getItem('accessToken');
  }

  constructor(private http: HttpClient) {}

  public signUp(user: UserSignUp) {
    let success: boolean = false;
    const signupEndpoint = `${this.baseUrl}/user/signUp`;
    const response = this.http.post(
      signupEndpoint,
      user
    ) as Observable<SignUpResponse>;
    response
      .pipe(
        tap((data) => {
          this.signUpResponse.next(data);
          success = true;
        }),
        catchError((data) => {
          this.signUpResponse.next(data.error);
          return of();
        })
      )
      .subscribe();
    return success;
  }

  public getHeaderWithAuth() {
    const accessToken = this.accessToken;
    if (!accessToken) {
      throw new Error('asd');
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return headers;
  }

  public login(user: User) {
    let success: boolean = false;

    const loginEndpoint = `${this.baseUrl}/user/login`;
    const response = this.http.post(
      loginEndpoint,
      user
    ) as Observable<AuthenticationResponse>;
    response
      .pipe(
        tap((res) => {
          this.loginResponse.next({ success: true });
          success = true;
          this.usernameFromResponse = res.username;
          localStorage.setItem('username', res.username);
          localStorage.setItem('accessToken', res.accessToken);
        }),
        catchError((data) => {
          this.loginResponse.next({ success: false, error: data.error.error });
          success = false;
          return of();
        })
      )
      .subscribe();
    return success;
  }

  public logout() {
    localStorage.clear();
    this.usernameFromResponse = null;
  }
}
