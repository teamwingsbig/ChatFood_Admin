import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CommonService} from './common.service';
import {ip} from '../../../assets/data/ip.json';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {
  ipAddress;

  constructor(
    public http: HttpClient,
    private commonService: CommonService
  ) {
    this.ipAddress = commonService.getFullUrl();
    // this.ipAddress = ip;
  }

  addPromocode(Data) {
    const url = this.ipAddress + 'promocodes/details/';
    return this.http.post(url, Data);
  }

  updatePromocode(Data) {
    const url = this.ipAddress + 'promocodes/details/';
    return this.http.put(url, Data);
  }

  deletePromocode(promocodeId) {
    const url = this.ipAddress + 'promocodes/details/?id=' + promocodeId;
    return this.http.delete(url);
  }

  fetchPromocode() {
    const url = this.ipAddress + 'promocodes/details/';
    return this.http.get(url);
  }

  fetchPromocodeById(id) {
    const url = this.ipAddress + 'promocodes/details/?id=' + id;
    return this.http.get(url);
  }
}
