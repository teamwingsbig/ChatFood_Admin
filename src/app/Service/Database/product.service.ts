import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ipAddress = 'http://localhost:8000/';

  constructor(public http: HttpClient) { }

  addAddonsCategory(Data) {
    const url = this.ipAddress + 'items/addoncategory/';
    return this.http.post(url, Data);
  }
  addProduct(Data) {
    const url = this.ipAddress + 'items/details/';
    return this.http.post(url, Data);
  }
  addMultipleAddons(Data) {
    const url = this.ipAddress + 'items/multipleaddons/';
    return this.http.post(url, Data);
  }
  fetchProduct() {
    const url = this.ipAddress + 'items/details/?page_wise=0';
    return this.http.get(url);
  }
  fetchProductByBranch(branch_id) {
    const url = this.ipAddress + 'items/details/?page_wise=0&branch_id=' + branch_id;
    return this.http.get(url);
  }
  fetchAddonsCategory() {
    const url = this.ipAddress + 'items/addoncategory/?page_wise=0';
    return this.http.get(url);
  }
  fetchVarientByItem(item_id) {
    const url = this.ipAddress + 'items/varients/?page_wise=0&item_id=' + item_id;
    return this.http.get(url);
  }
  fetchAddons() {
    const url = this.ipAddress + 'items/addons/?page_wise=0';
    return this.http.get(url);
  }
}
