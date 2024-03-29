import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MasterService} from '../../../Service/Database/master.service';
import {HttpErrorResponse} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListCustomersComponent implements OnInit {

  customerData;
  filter;
  p;
  modalRef: BsModalRef;
  blockModalRef: BsModalRef;

  public userData: any = [];


  constructor(
    public  authServie: AuthService,
    public route: Router,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public masterService: MasterService,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchCustomers();
  }

  public autherisationProcess() {
    // is logged in
    if (this.authServie.isLoggedIn()) {
      // is admin or not
      this.userData = this.authServie.getUserDetails();
      // if (this.userData.UserType != 0) {
      //   // navigate to loggin page
      //   this.route.navigate(["/dashboard"]);
      // }
    } else {
      // navigate to loggin page
      this.route.navigate(['/login']);
    }
  }

  fetchCustomers() {
    // this.spinner.show();
    this.masterService.fetchCustomers().subscribe(res => {
      // setTimeout(() => {
        this.customerData = res;
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openBlockUserModel(template: TemplateRef<any>) {
    this.blockModalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  blockUser(user_id) {
    this.spinner.show();
    const formData = new FormData();
    formData.append('keyword', 'block_user');
    formData.append('user_id', user_id);
    formData.append('is_blocked', 'true');
    this.masterService.blockUser(formData).subscribe(res => {
      setTimeout(() => {
        let ResutSet: any;
        ResutSet = res;
        if (ResutSet.Status) {
          this.toastService.showSuccess('Successfully Blocked', 'Success');
          this.fetchCustomers();
        } else {
          this.toastService.showError(ResutSet.Error, 'Oops !');
        }
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

  unBlockUser(user_id) {
    this.spinner.show();
    const formData = new FormData();
    formData.append('keyword', 'block_user');
    formData.append('user_id', user_id);
    formData.append('is_blocked', 'false');
    this.masterService.blockUser(formData).subscribe(res => {
      setTimeout(() => {
        let ResutSet: any;
        ResutSet = res;
        if (ResutSet.Status) {
          this.toastService.showSuccess('Successfully Unblocked', 'Success');
          this.fetchCustomers();

        } else {
          this.toastService.showError(ResutSet.Error, 'Oops !');
        }
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
