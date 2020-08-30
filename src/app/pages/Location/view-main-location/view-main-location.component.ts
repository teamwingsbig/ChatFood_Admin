import { Component, OnInit } from '@angular/core';
import {MasterService} from '../../../Service/Database/master.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../../Service/Alert/toast.service';

@Component({
  selector: 'app-view-main-location',
  templateUrl: './view-main-location.component.html',
  styleUrls: ['./view-main-location.component.css']
})
export class ViewMainLocationComponent implements OnInit {
  locationData: any = [];
  constructor(
    public  masterService: MasterService,
    public  toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.fetchMainLocation();
  }

  fetchMainLocation() {
    this.masterService.fetchMainLocation().subscribe(data => {
        this.locationData = data;
      },
      (error : HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          console.log('Backend returned status code: ', error.status);
          console.log('Response body:', error.error);
        }
      }
    );
  }
}
