import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements  HttpInterceptor  {

  constructor() { }
  intercept(req , next) {
    const TokenReq = req.clone({
      setHeaders: {
        Authorization: 'Token 62e6ef67ab955f81dccde9c080702c32e0675453'
      }
    });
    return next.handle(TokenReq);
  }
}
