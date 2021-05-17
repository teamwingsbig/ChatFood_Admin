import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewCategoryComponent implements OnInit {
  categotyData: any = [];

  p = 1;
  public filter;
  public  userData : any = [];
  StatusmodalRef: BsModalRef;
  modalRef: BsModalRef;
  constructor(
    public  maserservice: MasterService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    private modalService: BsModalService,
    public authService: AuthService,
    public  route: Router
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchcategory(this.userData.branch_id, this.userData.company_id);
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


  loadCategory() {
    if (this.userData.user_type === 1) {
      this.fetchcategory();
    } else if (this.userData.user_type === 2) {
      this.fetchcategotyByBranch()  ;
    }
  }
  decline(): void {
    this.StatusmodalRef.hide();
  }
  confirm(categoryId): void {
    this.deleteCategory(categoryId);
    this.StatusmodalRef.hide();
  }
  deleteCategory(categoryId) {
    // this.spinner.show();
    this.maserservice.deleteCategory(categoryId).subscribe((res: any) => {
      if (res.Status) {
        this.toastService.showSuccess('Category Deleted Succesfully', 'Success');
        this.fetchcategory(this.userData.branch_id, this.userData.company_id);
      } else {
        this.toastService.showError(res.Error, 'Oops !');
      }
      // setTimeout(() => {
      //
      //   // this.spinner.hide();
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
  fetchcategotyByBranch() {
    // this.spinner.show();
    this.maserservice.fetchCategory(this.userData.branch_id).subscribe(res => {
      // setTimeout(() => {
        this.categotyData = res;
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
  openStatusModel(template: TemplateRef<any>) {
    this.StatusmodalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  fetchcategory(branchId = null , companyId = null) {
    // this.spinner.show();
    this.maserservice.fetchCategory(branchId, companyId).subscribe(res => {
      // setTimeout(() => {
        this.categotyData = res;
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
}
