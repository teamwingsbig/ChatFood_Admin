import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-unit',
  templateUrl: './view-unit.component.html',
  styleUrls: ['./view-unit.component.css']
})
export class ViewUnitComponent implements OnInit {

  unitData: any = [];
  modalRef: BsModalRef;
  p = 1;
  public userData: any = [];
  public filter;
  StatusmodalRef: BsModalRef;
  constructor(
    public  maserservice: MasterService,
    private modalService: BsModalService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public  authService: AuthService,
    public  route: Router
  ) { }

  ngOnInit(): void {
    this.autherisationProcess();
      this.loadUnit();
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


  loadUnit() {
    if (this.userData.user_type === 1) {
      this.fetchUnit();
    } else if (this.userData.user_type === 2) {
      this.fetchUnitByBranch()  ;
    }
  }
  fetchUnit() {
    this.spinner.show();
    this.maserservice.fetchUnits().subscribe(res => {
      setTimeout(() => {
        this.unitData = res;
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
  fetchUnitByBranch() {
    this.spinner.show();
    this.maserservice.fetchUnits(this.userData.branch_id).subscribe(res => {
      setTimeout(() => {
        this.unitData = res;
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
  deleteUnit(unitId) {
    this.spinner.show();
    this.maserservice.deleteUnit(unitId).subscribe(res => {
      setTimeout(() => {
        console.log(res);
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
  confirm(branchId): void {
    this.deleteUnit(branchId);
    this.StatusmodalRef.hide();
  }
  openStatusModel(template: TemplateRef<any>) {
    this.StatusmodalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
}
