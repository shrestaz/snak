import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  AuthenticationResponse,
  LoginResponse,
  SignUpResponse,
  UserSignUp,
} from '../interfaces/auth';
import { User } from '../../../snak-server/src/interfaces/user';
import { CookieService } from 'ngx-cookie-service';

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
      this.cookieService.set('username', value, 30, '/');
    }
  }

  get usernameFromResponse(): string | null {
    return this.cookieService.get('username');
  }

  get accessToken() {
    return this.cookieService.get('accessToken');
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}

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
      throw new Error('Access token not found.');
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
          this.cookieService.set('username', res.username, 30, '/');
          this.cookieService.set('accessToken', res.accessToken, 30, '/');
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
    this.cookieService.deleteAll();
    this.usernameFromResponse = null;
  }
}
