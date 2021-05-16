import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  filterOrder(branchId, status, orderType) {
    let url;
    let params = new HttpParams();
    if (branchId != null) {
      params = params.append('branch_id', branchId);
    }
    if (status != null) {
      params = params.append('status_id', status);
    }
    if (orderType != null) {
      params = params.append('order_type', orderType);
    }
    // url = `${this.ipAddress}'orders/details/?page_wise=0&branch_id=${branchId}&order_type=${orderType}&status_id=${status}`;
    url = `${this.ipAddress}orders/details/?page_wise=0`;

    return this.http.get(url, {params});
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
