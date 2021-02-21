import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
  success: boolean;
  username?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  signUpSuccess = new BehaviorSubject<SignUpResponse>({ success: false });
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
    const signupEndpoint = `${this.baseUrl}/user/signUp`;
    const response = this.http.post(
      signupEndpoint,
      user
    ) as Observable<SignUpResponse>;
    response.pipe(tap((data) => this.signUpSuccess.next(data))).subscribe();
  }

  public login(user: User) {
    const loginEndpoint = `${this.baseUrl}/user/login`;
    const response = this.http.post(
      loginEndpoint,
      user
    ) as Observable<AuthenticationResponse>;
    response
      .pipe(
        tap((res) => {
          this.usernameFromResponse = res.username;
          localStorage.setItem('username', res.username);
          localStorage.setItem('accessToken', res.accessToken);
        })
      )
      .subscribe();
  }

  public logout() {
    localStorage.clear();
    this.usernameFromResponse = null;
  }
}
