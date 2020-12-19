import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {ip} from '../../../assets/data/ip.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ipAddress;

  constructor(public http: HttpClient) {
    this.ipAddress = ip;

  }

  isLoggedIn() {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      return true;
    } else {
      return false;
    }
  }

  login(Data) {
    const url = this.ipAddress + 'user/login/';
    return this.http.post(url, Data);
  }

  setToLoggedIn() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  setToLoggedOut() {
    localStorage.setItem('isLoggedIn', 'false');
  }

  getIsLoggedIn() {
    return localStorage.getItem('isLoggedIn');
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('UserData'));
  }

  clearUserDetails() {
    localStorage.removeItem('UserData');
  }

  // tslint:disable-next-line:variable-name
  setUserDetails(user_ID, Name, is_superuser, is_staff, phone, email, token, user_type, comapny_id, branch_id) {
    const Data = {
      user_id: user_ID,
      name: Name,
      is_superuser: is_superuser,
      is_staff: is_staff,
      email: email,
      phone: phone,
      token: token,
      user_type: user_type,
      company_id: comapny_id,
      branch_id: branch_id
    };

    localStorage.setItem('UserData', JSON.stringify(Data));
  }
}
