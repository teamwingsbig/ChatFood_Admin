import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ipAddress = 'http://localhost:8000/';

  constructor(public http: HttpClient) {
  }

  fetchAllOrder() {
    const url = this.ipAddress + 'orders/details/?page_wise=0';
    return this.http.get(url);
  }

  changeOrderStatus(Data) {
    const url = this.ipAddress + 'orders/details/';
    return this.http.patch(url, Data);
  }
}
