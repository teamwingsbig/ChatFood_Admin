import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductService} from '../../../../Service/Database/product.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../../../Service/Authentication/auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-addons',
  templateUrl: './view-addons.component.html',
  styleUrls: ['./view-addons.component.css',
    '../../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewAddonsComponent implements OnInit {

  addonsData: any = [];
  p = 1;
  public filter;
  public userData: any = [];
  modalRef: BsModalRef;
  StatusmodalRef: BsModalRef;
  constructor(
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public  productService: ProductService,
    private modalService: BsModalService,
    public  authService: AuthService,
    public  route: Router
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchAddons(this.userData.branch_id, this.userData.company_id);
  }
  loadAddons() {
    if (this.userData.user_type === 1) {
      this.fetchAddons();
    } else if (this.userData.user_type === 2) {
      this.fetchAddonsByBranch();
    }
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

  fetchAddons(brancId = null, companyId = null) {
    // this.spinner.show();
    this.productService.fetchAddons(brancId, companyId).subscribe(data => {
        // setTimeout(() => {
          this.addonsData = data;
          // this.spinner.hide();
        // }, 2000);
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          console.log('Backend returned status code: ', error.status);
          console.log('Response body:', error.error);
        }
      }
    );
  }

  fetchAddonsByBranch() {
    // this.spinner.show();
    this.productService.fetchAddons(this.userData.branch_id).subscribe(data => {
        // setTimeout(() => {
          this.addonsData = data;
          // this.spinner.hide();
        // }, 2000);
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          console.log('Backend returned status code: ', error.status);
          console.log('Response body:', error.error);
        }
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, );
  }
  decline(): void {
    this.StatusmodalRef.hide();
  }
  deleteAddons(addonId) {
    const data = {
      item_id: addonId,
      keyword: 'delete_item'
    };
    this.spinner.show();
    this.productService.deleteAddons(data).subscribe(res => {
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
  confirm(addonId): void {
    this.deleteAddons(addonId);
    this.StatusmodalRef.hide();
  }
  openStatusModel(template: TemplateRef<any>) {
    this.StatusmodalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
}
