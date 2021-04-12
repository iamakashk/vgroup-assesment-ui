import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userInputForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.userInputForm = this.formBuilder.group({
      inputOne: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(5)],
      ],
      inputTwo: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      ],
      inputThree: ['', [Validators.minLength(0), Validators.maxLength(4)]],
    });
  }
  ngOnInit() {}

  onSubmit() {
    console.log(this.userInputForm);
  }
  get basicForm() {
    return this.userInputForm.controls;
  }
  createClickHandler() {
    // alert('submitClickHandler()' + this.userInputForm.valid);
    console.log(this.userInputForm.value);
    //return false;
    if (this.userInputForm.valid) {
      const headers = new HttpHeaders({
        Authorization:
          'Basic ' +
          btoa(
            localStorage.getItem('username') +
              ':' +
              localStorage.getItem('password')
          ),
      });
      this.http
        .post(
          'http://localhost:8080/vgroup/v1/user/createPermutation',
          this.userInputForm.value,
          { headers }
        )
        .subscribe((data) => {
          let response: any = data;
          if (response) {
            alert('Combinations has been created succussfully.');
            this.router.navigateByUrl('user-inputs');
          } else {
            alert('Oops! Something went wrong. Please try again later!');
          }
          console.log('createPermutation###################', response);
        });
    } else {
      alert('Please fill all required values.');
    }
  }
}

// angular form is group of controls
