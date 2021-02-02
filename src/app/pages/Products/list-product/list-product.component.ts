import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductService} from '../../../Service/Database/product.service';
import {HttpErrorResponse} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListProductComponent implements OnInit {
  productData: any = [];
  p = 1;
  public filter;
  modalRef: BsModalRef;
  public userData: any = [];
  StatusmodalRef: BsModalRef;
  constructor(
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public productService: ProductService,
    private modalService: BsModalService,
    public  authService: AuthService,
    public  route: Router
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchProducts(this.userData.branch_id, this.userData.company_id);
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

  fetchProducts(branchId = null, companyId = null) {
    this.spinner.show();
    this.productService.fetchProduct(branchId, companyId).subscribe(res => {
      setTimeout(() => {
        this.productData = res;
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

  openVarients(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'gray modal-lg'});
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, );
  }
  decline(): void {
    this.StatusmodalRef.hide();
  }
  deleteProduct(productId) {
    const data = {
      item_id: productId,
      keyword: 'delete_item'
    };
    this.spinner.show();
    this.productService.deleteProduct(data).subscribe(res => {
        setTimeout(() => {
          let ResultSet: any;
          ResultSet = res;
          if (ResultSet.Status) {
            this.toastService.showSuccess('Product Successfully Deleted', 'Success');
            // reset form
            this.route.navigate(['/listProducts']);
          } else {
            this.toastService.showError(ResultSet.Error, 'Oops !');
          }
          this.spinner.hide();
        }, 2000);
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          // console.log('Backend returned status code: ', error.status);
          // console.log('Response body:', error.error);
        }
      }
    );
  }
  confirm(productId): void {
    console.log(productId);
    this.deleteProduct(productId);
    this.StatusmodalRef.hide();
  }
  openStatusModel(template: TemplateRef<any>) {
    this.StatusmodalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

}
