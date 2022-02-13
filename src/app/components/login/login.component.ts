import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LoginResponse, SignUpResponse } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(1)]),
    password: new FormControl('', Validators.required),
  });

  signUpMessage$ = new Observable<SignUpResponse>();
  loginMessage$ = new Observable<LoginResponse>();
  success: boolean = false;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.signUpMessage$ = this.authService.signUpResponse.asObservable();
    this.loginMessage$ = this.authService.loginResponse.asObservable();
  }

  onSubmit() {
    this.submitted = true;
    const formValue = this.loginForm.value;
    this.success = this.authService.login(formValue);
    this.loginMessage$
      .pipe(
        tap((v) => {
          if (v.success) {
            this.router.navigateByUrl('/allRooms');
          }
        })
      )
      .subscribe();
  }
}
