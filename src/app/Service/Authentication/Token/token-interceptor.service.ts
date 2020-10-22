import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements  HttpInterceptor  {

  Token;
  constructor(
    public  router: Router
  ) {
    if (localStorage.hasOwnProperty('UserData')) {
      this.Token = JSON.parse(localStorage.getItem('UserData')).token;
    } else {
      this.router.navigate(['/login']);
      // Default token
      // this.Token = 'Token 62e6ef67ab955f81dccde9c080702c32e0675453';
    }
  }
  intercept(req , next) {
    const TokenReq = req.clone({
      setHeaders: {
        Authorization: this.Token
      }
    });
    return next.handle(TokenReq);
  }
}
