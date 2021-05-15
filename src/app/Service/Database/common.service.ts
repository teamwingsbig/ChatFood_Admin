import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';

// import {environment} from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  getFullUrl() {
    return `${environment.apiUrl}`;
  }
}
