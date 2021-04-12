import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User {
  constructor(public status: string) {}
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username, password) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.httpClient
      .get<User>('http://localhost:8080/vgroup/v1/user/validateLogin', {
        headers,
      })
      .pipe(
        map((userData) => {
          sessionStorage.setItem('username', username);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
  getUserDetails(): any {
    let userDetail: any = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    };
    return userDetail;
  }
}