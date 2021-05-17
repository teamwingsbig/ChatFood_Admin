import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {OrderService} from '../../../Service/Database/order.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastService} from '../../../Service/Alert/toast.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {FilterComponent} from '../../../components/filter/filter.component';
import {MasterService} from '../../../Service/Database/master.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewOrderComponent implements OnInit {
  itemModalRef: BsModalRef;
  addonsModalRef: BsModalRef;

  orderData: any = [];
  p = 1;
  public filter;
  StatusmodalRef: BsModalRef;
  public orderStatus;
  public userData: any = [];
  statusData = [
    {
      id: 1,
      name: 'Pending'
    },
    {
      id: 2,
      name: 'Confirmed'
    },
    {
      id: 3,
      name: 'Declined'
    },
    {
      id: 4,
      name: 'Shipped'
    },
    {
      id: 6,
      name: 'Delivered'
    },
    {
      id: 'all',
      name: 'All'
    }
  ];
  branchData: any = [];
  showBranch = false;

  constructor(
    public orderService: OrderService,
    public spinner: NgxSpinnerService,
    public toastService: ToastService,
    private modalService: BsModalService,
    public authService: AuthService,
    public route: Router,
    public masterService: MasterService
  ) {

  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.loadBranch();
    this.getOrder();
  }

  loadBranch() {
    // console.log(this.userData.user_type);
    if (this.userData.user_type === 1) {
      //   admin
      this.fetchBranchByCompanyID();
    } else if (this.userData.user_type === 2) {
      this.fetchBranchByID();
    }
    // this.fetchBranchByID();
  }

  fetchBranchByCompanyID() {
    this.masterService.fetchBranchByCompanyID(this.userData.company_id).subscribe(res => {
      this.branchData = res;
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

  fetchBranchByID() {
    this.masterService.fetchBranchByID(this.userData.branch_id).subscribe(res => {
      this.branchData = res;
      console.log(res);
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

  public autherisationProcess() {
    // is logged in
    if (this.authService.isLoggedIn()) {
      // is admin or not
      this.userData = this.authService.getUserDetails();
      // if (this.userData.UserType != 0) {
      //   // navigate to loggin page
      //   this.route.navigate(["/dashboard"]);
      // }
    } else {
      // navigate to loggin page
      this.route.navigate(['/login']);
    }
  }


  getOrder() {
    if (this.userData.user_type === 1) {
      //   admin
      this.showBranch = true;
      this.getAllOrders();
    } else if (this.userData.user_type === 2) {
      this.showBranch = false;
      this.getAllOrdersByBranch();
    }
  }

  getAllOrdersByBranch() {
    // this.spinner.show();
    this.orderService.fetchAllOrder(this.userData.branch_id).subscribe(res => {
      // setTimeout(() => {
      this.orderData = res;
      // this.spinner.hide();
      // }, 2000);
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

  getAllOrders() {
    // this.spinner.show();
    this.orderData = [];
    this.orderService.fetchAllOrder().subscribe(res => {
      this.orderData = res;
      // setTimeout(() => {
      //   this.orderData = res;
      //   this.spinner.hide();
      // }, 2000);
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

  openItemModel(template: TemplateRef<any>) {
    this.itemModalRef = this.modalService.show(template, {class: 'gray modal-lg'});
  }

  openAddonsModel(template: TemplateRef<any>) {
    this.addonsModalRef = this.modalService.show(template, {class: 'gray modal-lg'});
  }


  onFilter(Data) {
    this.orderData = [];
    const empty = null;
    const branchId = Data.branch == 'all' ? empty : Data.branch;
    const status = Data.status == 'all' ? empty : Data.status;
    const orderType = Data.orderType == 'all' ? empty : Data.orderType;
    this.orderService.filterOrder(branchId, status, orderType).subscribe(res => {
      this.orderData = res;
      // setTimeout(() => {
      //   this.orderData = res;
      //   this.spinner.hide();
      // }, 2000);
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


  onClear(event) {
    this.getAllOrders();
  }
}
