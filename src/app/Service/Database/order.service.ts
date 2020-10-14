import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ip} from '../../../assets/data/ip.json';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ipAddress ;

  constructor(public http: HttpClient) {
    this.ipAddress = ip ;
  }

  fetchAllOrder() {
    const url = this.ipAddress + 'orders/details/?page_wise=0';
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
