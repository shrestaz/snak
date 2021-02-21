import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, SignUpResponse } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(1)]),
    password: new FormControl('', Validators.required),
  });

  signUpMessage$ = new Observable<SignUpResponse>();

  constructor(private authService: AuthService, private router: Router) {
    this.signUpMessage$ = this.authService.signUpSuccess;
  }

  ngOnInit(): void {}

  onSubmit() {
    const formValue = this.loginForm.value;
    this.authService.login(formValue);
    const { redirect } = window.history.state;
    this.router.navigateByUrl(redirect || '/');
  }
}
