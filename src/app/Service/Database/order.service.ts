import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ip} from '../../../assets/data/ip.json';
import {environment} from '../../../environments/environment';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ipAddress;

  constructor(public http: HttpClient, private commonService: CommonService) {
    this.ipAddress = commonService.getFullUrl();
    // this.ipAddress = ip;
  }

  fetchAllOrder(branch_id = null) {
    let url;
    if (branch_id === null) {
      url = this.ipAddress + 'orders/details/?page_wise=0';
    } else {
      url = this.ipAddress + 'orders/details/?page_wise=0&branch_id=' + branch_id;
    }
    return this.http.get(url);
  }

  fetchPenidngOrder(branch_id = null) {
    let url;
    if (branch_id === null) {
      url = this.ipAddress + 'orders/details/?page_wise=0&status_id=1';
    } else {
      url = this.ipAddress + 'orders/details/?page_wise=0&status_id=1&branch_id=' + branch_id;
    }
    return this.http.get(url);
  }

  changeOrderStatus(Data) {
    const url = this.ipAddress + 'orders/details/';
    return this.http.patch(url, Data);
  }

  fetchRecentOrder() {
    const url = this.ipAddress + 'orders/details/?page_wise=1';
    return this.http.get(url);
  }
}
