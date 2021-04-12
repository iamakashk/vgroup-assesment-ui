import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  invalidLogin = false;
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private loginservice: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  checkLogin() {
    if (this.loginForm.valid) {
      console.log(
        'username:' +
          this.loginForm.get('username').value +
          ' password:' +
          this.loginForm.get('password').value
      );
      this.loginservice
        .authenticate(
          this.loginForm.get('username').value,
          this.loginForm.get('password').value
        )
        .subscribe(
          (data) => {
            this.router.navigate(['home']);
            this.invalidLogin = false;
            localStorage.setItem(
              'username',
              this.loginForm.get('username').value
            );
            localStorage.setItem(
              'password',
              this.loginForm.get('password').value
            );
          },
          (error) => {
            this.invalidLogin = true;
          }
        );
    } else {
      alert('Please provide all details');
    }
  }
}
