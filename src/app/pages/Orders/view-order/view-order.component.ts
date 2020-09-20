import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../Service/Database/order.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastService} from '../../../Service/Alert/toast.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  orderData: any = [];
  p = 1;
  public filter;

  constructor(
    public  orderService: OrderService,
    public spinner: NgxSpinnerService,
    public toastService: ToastService,
  ) {

  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.spinner.show();
    this.orderService.fetchAllOrder().subscribe(res => {
      setTimeout(() => {
        this.orderData = res;
        this.spinner.hide();
      }, 2000);
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
