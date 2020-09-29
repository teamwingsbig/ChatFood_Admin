import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {OrderService} from '../../../Service/Database/order.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastService} from '../../../Service/Alert/toast.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewOrderComponent implements OnInit {
  orderData: any = [];
  p = 1;
  public filter;
  StatusmodalRef: BsModalRef;
  public orderStatus;

  constructor(
    public  orderService: OrderService,
    public spinner: NgxSpinnerService,
    public toastService: ToastService,
    private modalService: BsModalService
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

  confirm(order_id): void {
    this.changeStatus(order_id);
    this.StatusmodalRef.hide();
  }

  changeStatus(order_id) {
    const Data = {
      keyword: 'change_status',
      order_id: order_id,
      status_id: this.orderStatus,
      description: 'Approved'
    };
    // convert json data to formData
    // tslint:disable-next-line:prefer-const
    let formData = new FormData();
    Object.keys(Data).forEach(key => {
      formData.append(key, Data[key]);
    });
    this.orderService.changeOrderStatus(formData).subscribe(res => {
      let ResultSet: any;
      console.log(res);
      ResultSet = res;
      if (ResultSet.Status) {
        this.toastService.showSuccess('Status Successfully changed', 'Success ');
        this.getAllOrders();
      } else {
        this.toastService.showError(ResultSet.Error, 'Oops ! ');

      }
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

  openStatusModel(template: TemplateRef<any>, status) {
    this.orderStatus = status;
    this.StatusmodalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.StatusmodalRef.hide();
  }
}
