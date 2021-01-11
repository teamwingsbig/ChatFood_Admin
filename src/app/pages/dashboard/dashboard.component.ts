import {Component, OnInit, TemplateRef} from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import {AuthService} from '../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {OrderService} from '../../Service/Database/order.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ToastService} from '../../Service/Alert/toast.service';
import {MasterService} from '../../Service/Database/master.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  filter;
  p;
  public datasets: any;
  public recentOrderData: any = [];
  public admindashboardData: any = [];
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public userData: any = [];
  public orderStatus;
  StatusmodalRef: BsModalRef;
  itemModalRef: BsModalRef;
  addonsModalRef: BsModalRef;

  constructor(
    public authService: AuthService,
    public route: Router,
    public orderService: OrderService,
    public masterService: MasterService,
    public toastService: ToastService,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit() {
    this.autherisationProcess();
    this.getOrder();
    this.loadAdminDashboard();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
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
      this.fetchPenidngOrder();
    } else if (this.userData.user_type === 2) {
      this.fetchPenidngOrderBybranch();
    }
  }



  loadAdminDashboard() {
    this.masterService.fetchAdminDashbord().subscribe(res => {
      this.admindashboardData = res;
    }),
      // tslint:disable-next-line:no-unused-expression
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // console.log('An error occurred:', error.error.message);
          // this.toastService.showError('An error occcured', 'Oops !');
        } else {
          // this.toastService.showError('An error occcured', 'Oops !');
          // console.log('Backend returned status code: ', error.status);
          // console.log('Response body:', error.error);
        }
      };
  }

  fetchPenidngOrder() {
    this.orderService.fetchPenidngOrder().subscribe(res => {
      this.recentOrderData = res;
    }),
      // tslint:disable-next-line:no-unused-expression
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // console.log('An error occurred:', error.error.message);
          // this.toastService.showError('An error occcured', 'Oops !');
        } else {
          // this.toastService.showError('An error occcured', 'Oops !');
          // console.log('Backend returned status code: ', error.status);
          // console.log('Response body:', error.error);
        }
      };
  }

  fetchPenidngOrderBybranch() {
    this.orderService.fetchPenidngOrder(this.userData.branch_id).subscribe(res => {
      this.recentOrderData = res;
    }),
      // tslint:disable-next-line:no-unused-expression
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // console.log('An error occurred:', error.error.message);
          // this.toastService.showError('An error occcured', 'Oops !');
        } else {
          // this.toastService.showError('An error occcured', 'Oops !');
          // console.log('Backend returned status code: ', error.status);
          // console.log('Response body:', error.error);
        }
      };
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
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
        this.getOrder();
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

}
