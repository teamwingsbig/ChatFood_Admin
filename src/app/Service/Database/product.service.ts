import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ipAddress = 'http://localhost:8000/';

  constructor(public http: HttpClient) { }

  addProduct(Data) {
    const url = this.ipAddress + 'items/details/';
    return this.http.post(url, Data);
  }
  fetchProduct() {
    const url = this.ipAddress + 'items/details/?page_wise=0';
    return this.http.get(url);
  }
}
