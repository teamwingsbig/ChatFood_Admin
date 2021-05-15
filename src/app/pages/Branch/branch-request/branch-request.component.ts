import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-branch-request',
  templateUrl: './branch-request.component.html',
  styleUrls: ['./branch-request.component.css']
})
export class BranchRequestComponent implements OnInit {

  filter;
  brnachData: any = [];
  public userData: any = [];
  status = 'Blocked';
  modalRef: BsModalRef;
  p = 1;
  constructor(
    public  maserservice: MasterService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    private modalService: BsModalService,
    public  authServie: AuthService,
    public route: Router
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchBranch(false);
  }

  onChangeStatus(status) {
    if (status == 'Approved') {
      this.fetchBranch(true);

    } else if (status == 'Blocked') {
      this.fetchBranch(false);
    }
  }

  fetchBranch(status) {
    this.brnachData = [];
    // this.spinner.show();
    this.maserservice.fetchBranchRequest(status).subscribe(res => {
      // setTimeout(() => {
        this.brnachData = res;
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

  openUpdateForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,);
  }

  updateBranchRequest(branch_id, status) {
    this.spinner.show();
    const data = {
      branch_id: branch_id,
      is_approved: status
    };
    this.maserservice.updateBranchRequest(data).subscribe((res: any) => {
      console.log(res);
      setTimeout(() => {
        if (res.Status) {
          this.toastService.showSuccess('Updated successfully', 'Success');
          this.fetchBranch(status);
        } else {
          this.toastService.showError(res.Error, 'Oops !');
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
