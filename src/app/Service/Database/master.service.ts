import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {jsGlobalObjectValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/known_declaration';

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
  fetchBranch() {
    const url = this.ipAddress + 'company/branch/?&page_wise=false';
    return this.http.get(url);
  }
  addMainLocation(Data) {
    const url = this.ipAddress + 'locations/mainlocations/';
    return this.http.post(url, Data);
  }
  addSubLocation(Data) {
    const url = this.ipAddress + 'locations/sublocations/';
    return this.http.post(url, Data);
  }
  addUnit(Data) {
    const url = this.ipAddress + 'items/units/';
    return this.http.post(url, Data);
  }
  addCategory(Data) {
    const url = this.ipAddress + 'items/category/';
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
  fetchUnits() {
    const url = this.ipAddress + 'items/units/?page_wise=0';
    return this.http.get(url);
  }
  fetchSubLocationByMainLocation(parent_location_id) {
    const url = this.ipAddress + 'locations/sublocations/?page_wise=0&parent_location_id='+ parent_location_id;
    return this.http.get(url);
  }
}
