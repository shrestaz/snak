import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  SignUpResponse,
  UserSignUp,
} from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  submitted: boolean = false;

  registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

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
    this.authService.signUp(formValue);
    this.router.navigateByUrl('/login');
  }
}
