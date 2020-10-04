import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {MasterService} from '../../../Service/Database/master.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewBranchComponent implements OnInit {
  modalRef: BsModalRef;
  brnachData: any = [];
  public userData: any = [];

  constructor(
    public  maserservice: MasterService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    private modalService: BsModalService,
    public  authServie: AuthService,
    public route: Router
  ) {
  }

  p = 1;
  public filter;

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchBranch();
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

  fetchBranch() {
    this.spinner.show();
    this.maserservice.fetchBranch().subscribe(res => {
      setTimeout(() => {
        this.brnachData = res;
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
    this.modalRef = this.modalService.show(template,);
  }
}
