import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {jsGlobalObjectValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/known_declaration';
import {ip} from '../../../assets/data/ip.json';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  ipAddress;

  constructor(public http: HttpClient) {
    this.ipAddress = ip;
  }

  addBranch(Data) {
    const url = this.ipAddress + 'company/branch/';
    return this.http.post(url, Data);
  }

  updateBranch(Data) {
    const url = this.ipAddress + 'company/branch/';
    return this.http.put(url, Data);
  }

  fetchCustomers() {
    const url = this.ipAddress + 'user/profile/?keyword=all_profile&is_deliveryboy=0&page_wise=0';
    return this.http.get(url);
  }

  blockUser(Data) {
    const url = this.ipAddress + 'user/profile/';
    return this.http.patch(url, Data);
  }

  fetchCompanyProfile() {
    const url = this.ipAddress + 'company/profile/';
    return this.http.get(url);
  }

  updateCompanyProfile(Data) {
    const url = this.ipAddress + 'company/profile/';
    return this.http.put(url, Data);
  }

  fetchBranch() {
    const url = this.ipAddress + 'company/branch/?page_wise=false';
    return this.http.get(url);
  }

  fetchBranchByID(id) {
    const url = this.ipAddress + 'company/branch/?page_wise=false&id=' + id;
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

  updateMainLocation(Data) {
    const url = this.ipAddress + 'locations/mainlocations/';
    return this.http.put(url, Data);
  }

  addUnit(Data) {
    const url = this.ipAddress + 'items/units/';
    return this.http.post(url, Data);
  }

  updateUnit(Data) {
    const url = this.ipAddress + 'items/units/';
    return this.http.put(url, Data);
  }

  addManager(Data) {
    const url = this.ipAddress + 'user/profile/';
    return this.http.post(url, Data);
  }

  addCategory(Data) {
    const url = this.ipAddress + 'items/category/';
    return this.http.post(url, Data);
  }

  updateCategory(Data) {
    const url = this.ipAddress + 'items/category/';
    return this.http.put(url, Data);
  }

  fetchMainLocation() {
    const url = this.ipAddress + 'locations/mainlocations/?page_wise=0';
    return this.http.get(url);
  }

  fetchCategory() {
    const url = this.ipAddress + 'items/category/?page_wise=0';
    return this.http.get(url);
  }

  fetchCategoryByBranch(branch_id) {
    const url = this.ipAddress + 'items/category/?page_wise=0&branch_id=' + branch_id;
    return this.http.get(url);
  }

  fetchSubLocation() {
    const url = this.ipAddress + 'locations/sublocations/?page_wise=0';
    return this.http.get(url);
  }

  fetchUnits() {
    const url = this.ipAddress + 'items/units/?page_wise=0';
    return this.http.get(url);
  }

  fetchSubLocationByMainLocation(parent_location_id) {
    const url = this.ipAddress + 'locations/sublocations/?page_wise=0&parent_location_id=' + parent_location_id;
    return this.http.get(url);
  }
}
