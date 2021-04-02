import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PickupService} from '../../../Service/Database/pickup.service';
import {ToastService} from '../../../Service/Alert/toast.service';

@Component({
  selector: 'app-pickup-points',
  templateUrl: './pickup-points.component.html',
  styleUrls: ['./pickup-points.component.css']
})
export class PickupPointsComponent implements OnInit {
  p;
  pickeupData : any = [];
  constructor(
    private pickupService: PickupService,
    public  toastService: ToastService,

  ) { }

  ngOnInit(): void {
    this.loadPickupPoints();
  }

  loadPickupPoints() {
    this.pickupService.getPickeup(false).subscribe(res => {
      this.pickeupData = res;
    }),
      // tslint:disable-next-line:no-unused-expression
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          // console.log('Backend returned status code: ', error.status);
          // console.log('Response body:', error.error);
        }
      };
  }
}
