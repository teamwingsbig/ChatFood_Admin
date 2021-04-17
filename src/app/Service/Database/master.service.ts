import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {jsGlobalObjectValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/known_declaration';
import {ip} from '../../../assets/data/ip.json';
import {formatDate} from '@angular/common';

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

  deleteBranch(branchId) {
    const url = this.ipAddress + 'company/branch/?id=' + branchId;
    console.log(url);
    return this.http.delete(url);
  }


  fetchCustomers() {
    const url = this.ipAddress + 'user/profile/?keyword=all_profile&is_deliveryboy=0&page_wise=0';
    return this.http.get(url);
  }

  blockUser(Data) {
    const url = this.ipAddress + 'user/profile/';
    return this.http.patch(url, Data);
  }
  updateProfile(Data) {
    console.log(Data);
    const url = this.ipAddress + 'user/profile/';
    return this.http.put(url, Data);
  }

  fetchCompanyProfile() {
    const url = this.ipAddress + 'company/profile/';
    return this.http.get(url);
  }

  fetchCompany(companyId) {
    const url = this.ipAddress + 'company/profile/?id=' + companyId;
    return this.http.get(url);
  }

  updateCompanyProfile(Data) {
    const url = this.ipAddress + 'company/profile/';
    return this.http.put(url, Data);
  }

  addCompany(Data) {
    const url = this.ipAddress + 'company/profile/';
    return this.http.post(url, Data);
  }

  updateCompany(Data) {
    const url = this.ipAddress + 'company/profile/';
    return this.http.put(url, Data);
  }

  deleteCompany(comapnyId) {
    const url = this.ipAddress + 'company/profile/?id=' + comapnyId;
    return this.http.delete(url);
  }

  signup(Data) {
    const url = this.ipAddress + 'user/profile/';
    return this.http.post(url, Data);
  }

  fetchBranch() {
    const url = this.ipAddress + 'company/branch/?page_wise=false';
    return this.http.get(url);
  }

  fetchBranchRequest(status) {
    const url = this.ipAddress + `company/branch/?is_approved=${status}&page_wise=false`;
    return this.http.get(url);
  }


  updateBranchRequest(Data) {
    const url = this.ipAddress + `company/branch/`;
    return this.http.patch(url, Data);
  }

  fetchBranchByCompanyID(id) {
    const url = this.ipAddress + 'company/branch/?page_wise=0&company_id=' + id;
    return this.http.get(url);
  }

  fetchBranchByID(id) {
    const url = this.ipAddress + 'company/branch/?page_wise=false&id=' + id;
    return this.http.get(url);
  }

  fetchCompanyDetails() {
    const url = this.ipAddress + 'company/additional/mycompanies';
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

  deleteUnit(unitId) {
    const url = this.ipAddress + 'items/units/?id=' + unitId;
    return this.http.delete(url);
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

  deleteCategory(categoryId) {
    const data = {
      keyword : 'delete_category',
      category_id : categoryId
    }
    const url = this.ipAddress + 'items/category/';
    return this.http.patch(url, data);
  }

  fetchMainLocation() {
    const url = this.ipAddress + 'locations/mainlocations/?page_wise=0';
    return this.http.get(url);
  }

  fetchCategory(branch_id = null, companyId = null) {
    let url;
    if (branch_id != null && branch_id !== 0) {
      // const url = this.ipAddress + 'items/category/?page_wise=0';
      url = this.ipAddress + 'items/category/?page_wise=0&branch_id=' + branch_id;
      return this.http.get(url);
    } else if (companyId != null && companyId !== 0) {
      url = this.ipAddress + 'items/category/?page_wise=0&company_id=' + companyId;
      return this.http.get(url);
    }

  }

  fetchCategoryByBranch(branch_id) {
    const url = this.ipAddress + 'items/category/?page_wise=0&branch_id=' + branch_id;
    return this.http.get(url);
  }

  fetchSubLocation() {
    const url = this.ipAddress + 'locations/sublocations/?page_wise=0';
    return this.http.get(url);
  }

  fetchUnits(branch_id = null , companyId = null) {
    let url;
    if (branch_id != null && branch_id !== 0) {
       url = this.ipAddress + `items/units/?branch_id=${branch_id}&page_wise=0`;
      return this.http.get(url);
    } else if (companyId != null && companyId !== 0) {
       url = this.ipAddress + `items/units/?company_id=${companyId}&page_wise=0`;
      return this.http.get(url);
    }
  }

  fetchAdminDashbord() {
    const date = formatDate(Date.now(), 'y-MM-dd H:M:S', 'en-US');
    const url = this.ipAddress + `dashboard/?from_date=${date}&to_date=${date}`;
    return this.http.get(url);
  }

  fetchSubLocationByMainLocation(parent_location_id) {
    const url = this.ipAddress + 'locations/sublocations/?page_wise=0&parent_location_id=' + parent_location_id;
    return this.http.get(url);
  }
  fetchUserProfile() {
    const url = this.ipAddress + 'user/profile/';
    return this.http.get(url);
  }
}
