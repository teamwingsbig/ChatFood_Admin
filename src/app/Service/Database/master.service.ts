import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  ipAddress = 'http://localhost:8000/';
  constructor(public http: HttpClient) { }

  addBranch(Data) {
    const url = this.ipAddress + 'company/branch/';
    return this.http.post(url, Data);
  }
  addMainLocation(Data) {
    const url = this.ipAddress + 'locations/mainlocations/';
    return this.http.post(url, Data);
  }
  addSubLocation(Data) {
    const url = this.ipAddress + 'locations/sublocations/';
    return this.http.post(url, Data);
  }
  fetchMainLocation() {
    const url = this.ipAddress + 'locations/mainlocations/?page_wise=0';
    return this.http.get(url);
  }
  fetchSubLocation() {
    const url = this.ipAddress + 'locations/sublocations/';
    return this.http.get(url);
  }
  fetchSubLocationByMainLocation(parent_location_id) {
    const url = this.ipAddress + 'locations/sublocations/';
    return this.http.get(url);
  }
}
