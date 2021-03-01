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

  deleteAddonsCategory(addonsCatId) {
    const url = this.ipAddress + 'items/addoncategory/?id=' + addonsCatId;
    return this.http.delete(url);
  }

  updateAddonsCategory(Data) {
    const url = this.ipAddress + 'items/addoncategory/';
    return this.http.put(url, Data);
  }

  addProduct(Data) {
    const url = this.ipAddress + 'items/details/';
    return this.http.post(url, Data);
  }

  deleteProduct(data) {
    console.log(data);
    const url = this.ipAddress + 'items/details/';
    return this.http.patch(url, data);
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

  saveVarients(Data) {
    const url = this.ipAddress + 'items/varients/';
    return this.http.post(url, Data);
  }

  deleteVarients(variantId) {
    const url = this.ipAddress + 'items/varients/?id=' + variantId;
    return this.http.delete(url);
  }

  updateAddons(Data) {
    const url = this.ipAddress + 'items/addons/';
    return this.http.put(url, Data);
  }

  deleteAddons(Data) {
    console.log(Data);
    const url = this.ipAddress + 'items/addons/';
    return this.http.patch(url, Data);
  }

  fetchProduct(branch_id = null, company_id = null) {

    let url;
    // tslint:disable-next-line:triple-equals
    if (branch_id != null && branch_id != 0) {
      console.log('brandhcid url');
      url = this.ipAddress + `items/details/?page_wise=0&branch_id=${branch_id}`;

      // tslint:disable-next-line:triple-equals
    } else if (company_id != null && company_id != 0) {
      url = this.ipAddress + `items/details/?page_wise=0&company_id=${company_id}`;
    }
    // const url = this.ipAddress + 'items/details/?page_wise=0';
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


  fetchAddonsCategory(branch_id = null, companyId = null) {
    let url;
    if (companyId != null && companyId !== 0) {
       url = this.ipAddress + 'items/addoncategory/?page_wise=0&company_id=' + companyId;
      return this.http.get(url);
    } else if (branch_id != null && branch_id !== 0) {
       url = this.ipAddress + 'items/addoncategory/?page_wise=0&branch_id=' + branch_id;
      return this.http.get(url);
    }

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

  fetchAddons(branch_id = null, companyId = null) {
    let url;
    if (companyId != null && companyId !== 0) {
      url = this.ipAddress + 'items/addons/?page_wise=0&company_id=' + companyId;
      return this.http.get(url);
    } else if (branch_id != null && branch_id !== 0 ) {
       url = this.ipAddress + 'items/addons/?page_wise=0&branch_id=' + branch_id;
      return this.http.get(url);
    }

  }

  fetchAddonsByID(id) {
    const url = this.ipAddress + 'items/addons/?page_wise=0&id=' + id;
    return this.http.get(url);
  }
}
