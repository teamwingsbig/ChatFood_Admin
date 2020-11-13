import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ip} from '../../../assets/data/ip.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ipAddress;

  constructor(public http: HttpClient) {
    this.ipAddress = ip;
  }

  addAddonsCategory(Data) {
    const url = this.ipAddress + 'items/addoncategory/';
    return this.http.post(url, Data);
  }

  updateAddonsCategory(Data) {
    const url = this.ipAddress + 'items/addoncategory/';
    return this.http.put(url, Data);
  }

  addProduct(Data) {
    const url = this.ipAddress + 'items/details/';
    return this.http.post(url, Data);
  }
  updateProduct(Data) {
    const url = this.ipAddress + 'items/details/';
    return this.http.put(url, Data);
  }

  addMultipleAddons(Data) {
    const url = this.ipAddress + 'items/multipleaddons/';
    return this.http.post(url, Data);
  }

  updateVarients(Data) {
    const url = this.ipAddress + 'items/varients/';
    return this.http.put(url, Data);
  }

  updateAddons(Data) {
    const url = this.ipAddress + 'items/addons/';
    return this.http.put(url, Data);
  }

  fetchProduct() {
    const url = this.ipAddress + 'items/details/?page_wise=0';
    return this.http.get(url);
  }

  fetchProductByID(productID) {
    const url = this.ipAddress + 'items/details/?page_wise=0&id=' + productID;
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

  fetchItemByVarient(id, branch_id) {
    const url = this.ipAddress + 'items/details/?page_wise=0&varient_id=' + id + '&branch_id=' + branch_id;
    return this.http.get(url);
  }

  fetchVarientByItem(item_id) {
    const url = this.ipAddress + 'items/varients/?page_wise=0&item_id=' + item_id;
    return this.http.get(url);
  }

  fetchVarientByID(varient_id) {
    const url = this.ipAddress + 'items/varients/?page_wise=0&item_id=' + varient_id;
    return this.http.get(url);
  }

  fetchAddons() {
    const url = this.ipAddress + 'items/addons/?page_wise=0';
    return this.http.get(url);
  }

  fetchAddonsByID(id) {
    const url = this.ipAddress + 'items/addons/?page_wise=0&id=' + id;
    return this.http.get(url);
  }
}
