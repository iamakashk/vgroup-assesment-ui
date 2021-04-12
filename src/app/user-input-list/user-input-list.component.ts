import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-input-list',
  templateUrl: './user-input-list.component.html',
  styleUrls: ['./user-input-list.component.scss'],
})
export class UserInputListComponent implements OnInit {
  userInputList: UserInput[];
  isPageDataLoaded: boolean = false;
  hasErrorOccured: boolean = true;

  constructor(private http: HttpClient) {
    this.userInputList = [];
    const headers = new HttpHeaders({
      Authorization:
        'Basic ' +
        btoa(
          localStorage.getItem('username') +
            ':' +
            localStorage.getItem('password')
        ),
    });
    try {
      this.http
        .get('http://localhost:8080/vgroup/v1/admin/getAllInputs', { headers })
        .subscribe((data) => {
          let response: any = data;
          this.userInputList = response;
          this.userInputList.forEach((element) => {
            element.hasCombinationsLoaded = false;
          });
          console.log('###################', this.userInputList);
          this.hasErrorOccured = false;
          this.isPageDataLoaded = true;
        });
    } catch (error) {
      this.hasErrorOccured = true;
      this.isPageDataLoaded = true;
      alert('error ocuured');
      console.log(error);
    }
  }

  ngOnInit(): void {}

  getCombinationClickHandler(item) {
    let selectedUserInput: UserInput = new UserInput();
    selectedUserInput = item;
    console.log(item);
    //alert('Please wait ');
    if (!selectedUserInput.hasCombinationsLoaded) {
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
        .get(
          'http://localhost:8080//vgroup/v1/admin/getPermutation?inputId=' +
            selectedUserInput.id,
          { headers }
        )
        .subscribe((data) => {
          let response: any = data;
          let inputCombinations: Combination[] = [];
          console.log('all combinations###################', response);
          inputCombinations = response;
          this.userInputList.forEach((element) => {
            if (element.id === selectedUserInput.id) {
              element.hasCombinationsLoaded = true;
              element.combinations = inputCombinations;
            }
          });
        });
    }
  }
}

export class UserInput {
  id: number;
  inputValue: String;
  hasCombinationsLoaded: boolean;
  combinations: Combination[] = [];
}

export class Combination {
  combId: number;
  strCombination: String;
  inputId: number;
}
