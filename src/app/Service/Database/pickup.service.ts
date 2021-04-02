import { Injectable } from '@angular/core';
import {ip} from '../../../assets/data/ip.json';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PickupService {
  ipAddress;

  constructor(public http: HttpClient) {
    this.ipAddress = ip;
  }

  addPickup(Data) {
    const url = this.ipAddress + 'company/pickuppoint/';
    return this.http.post(url, Data);
  }

  getPickeup(page_wise) {
    const url = this.ipAddress + `company/pickuppoint/?page_wise=${page_wise}`;
    return this.http.get(url);
  }

}
