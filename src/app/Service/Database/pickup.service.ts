import {Injectable} from '@angular/core';
import {ip} from '../../../assets/data/ip.json';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PickupService {
  ipAddress;

  constructor(public http: HttpClient, private commonService: CommonService) {
    // this.ipAddress = environment.apiUrl;
    this.ipAddress = commonService.getFullUrl();
    // this.ipAddress = ip;

  }

  addPickup(Data) {
    const url = this.ipAddress + 'company/pickuppoint/';
    return this.http.post(url, Data);
  }

  editPickup(Data) {
    const url = this.ipAddress + 'company/pickuppoint/';
    return this.http.put(url, Data);
  }

  deletePickup(id) {
    const url = this.ipAddress + `company/pickuppoint/?id=${id}`;
    return this.http.delete(url);
  }

  getPickeup(page_wise) {
    const url = this.ipAddress + `company/pickuppoint/?page_wise=${page_wise}`;
    return this.http.get(url);
  }

  getPickeupBybranch(page_wise) {
    const url = this.ipAddress + `company/pickuppoint/?page_wise=${page_wise}`;
    return this.http.get(url);
  }

  getPickeupByCompany(page_wise, companyId) {
    const url = this.ipAddress + `company/pickuppoint/?page_wise=${page_wise}&company_id=${companyId}`;
    return this.http.get(url);
  }

  getPickeupById(id) {
    const url = this.ipAddress + `company/pickuppoint/?page_wise=true&id=${id}`;
    return this.http.get(url);
  }

}
