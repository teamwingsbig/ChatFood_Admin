import {Injectable} from '@angular/core';
import {ip} from '../../../assets/data/ip.json';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {
  ipAddress;

  constructor(
    public http: HttpClient
  ) {
    this.ipAddress = ip;
  }
  addPromocode(Data) {
    const url = this.ipAddress + 'promocodes/details/';
    return this.http.post(url, Data);
  }
}
