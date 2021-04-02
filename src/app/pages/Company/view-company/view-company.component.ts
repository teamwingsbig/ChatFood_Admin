import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MasterService} from '../../../Service/Database/master.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  companyData: any = [];
  StatusmodalRef: BsModalRef;
  modalRef: BsModalRef;
  public filter;
  p = 1;
  public userData: any = [];
  constructor(  public  authServie: AuthService,   public toastService: ToastService,
                public spinner: NgxSpinnerService,
                private modalService: BsModalService,
                public  maserservice: MasterService,
                public route: Router) { }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchCompany();
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
  fetchCompany() {
    this.spinner.show();
    this.maserservice.fetchCompanyProfile().subscribe(res => {
      setTimeout(() => {
        this.companyData = res['results'];
        console.log(this.companyData);
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, );
  }
  decline(): void {
    this.StatusmodalRef.hide();
  }
  confirm(companyId): void {
    this.deleteCompany(companyId);
    this.StatusmodalRef.hide();
  }
  deleteCompany(companyId) {
    this.spinner.show();
    this.maserservice.deleteCompany(companyId).subscribe((res: any) => {
      if (res.status){
        this.toastService.showSuccess('Company Deleted Succesfully', 'Success');
      }else {
        this.toastService.showError(res.Error, 'Oops !');
      }
      setTimeout(() => {

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
  openStatusModel(template: TemplateRef<any>) {
    this.StatusmodalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

}
