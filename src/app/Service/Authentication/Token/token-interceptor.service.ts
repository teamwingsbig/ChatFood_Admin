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
        Authorization: 'Token 6a689f6b1910afbbd4ad11475f855b99d5706060'
      }
    });
    return next.handle(TokenReq);
  }
}
