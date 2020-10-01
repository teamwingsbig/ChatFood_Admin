import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ipAddress = 'http://18.221.217.238:80/';

  constructor(public http: HttpClient) {
  }

  fetchAllOrder() {
    const url = this.ipAddress + 'orders/details/?page_wise=0';
    alert(url);
    return this.http.get(url);
  }

  changeOrderStatus(Data) {
    const url = this.ipAddress + 'orders/details/';
    return this.http.patch(url, Data);
  }
}
