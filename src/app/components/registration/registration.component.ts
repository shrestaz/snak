import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpResponse, UserSignUp } from '../../interfaces/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  signUpMessage$ = new Observable<SignUpResponse>();
  success: boolean = false;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.signUpMessage$ = this.authService.signUpResponse.asObservable();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    const formValue = this.registrationForm.value as UserSignUp;
    const { confirmPassword, password, username } = formValue;
    if (!confirmPassword || !password || !username) {
      return;
    }
    if (formValue.password !== formValue.confirmPassword) {
      this.registrationForm.controls['confirmPassword'].setErrors({
        match: false,
      });
      return;
    }
    this.success = this.authService.signUp(formValue);
    this.signUpMessage$
      .pipe(
        tap((v) => {
          if (v.success) {
            this.router.navigateByUrl('/login');
          }
        })
      )
      .subscribe();
  }
}
