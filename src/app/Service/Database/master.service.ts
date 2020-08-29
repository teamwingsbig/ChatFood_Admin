import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  ipAddress = 'http://localhost:8000/';
  constructor(public http: Http) { }

  addMainLocation(Data) {
    const headers = new Headers({
      'Authorization': 'Token 6a689f6b1910afbbd4ad11475f855b99d5706060'
    });
    const url = this.ipAddress + 'locations/mainlocations/';
    return new Promise((resolve, reject) => {
      this.http.post(url, Data, { headers: headers }).subscribe(res => {
        resolve(res.json());
      }),
        // tslint:disable-next-line:no-unused-expression
        err => {
          reject(err);
        };
    });
  }

  addSubLocation(Data) {
    const url = this.ipAddress + 'locations/sublocations/';
    return new Promise((resolve, reject) => {
      this.http.post(url, Data).subscribe(res => {
        resolve(res.json());
      }),
        // tslint:disable-next-line:no-unused-expression
        err => {
          reject(err);
        };
    });
  }
  fetchMainLocation() {
    const headers = new Headers({
      'Authorization': 'Token 6a689f6b1910afbbd4ad11475f855b99d5706060'
    });
    const url = this.ipAddress + 'locations/mainlocations/?page_wise=0';
    return new Promise((resolve, reject) => {
      this.http.get(url,{headers: headers}).subscribe(res => {
        resolve(res.json());
      }),
        // tslint:disable-next-line:no-unused-expression
        err => {
          reject(err);
        };
    });
  }
  fetchSubLocation() {
    const url = this.ipAddress + 'locations/sublocations/';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res.json());
      }),
        // tslint:disable-next-line:no-unused-expression
        err => {
          reject(err);
        };
    });
  }
}
