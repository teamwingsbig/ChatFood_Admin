import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductService} from '../../../../Service/Database/product.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../Service/Authentication/auth.service';

@Component({
  selector: 'app-view-addons-category',
  templateUrl: './view-addons-category.component.html',
  styleUrls: ['./view-addons-category.component.css',
  '../../../../../assets/CSS/toastr.css'],
  encapsulation : ViewEncapsulation.None
})
export class ViewAddonsCategoryComponent implements OnInit {
  categoryData: any = [];
  p = 1;
  public filter;
  public userData : any = [];

  constructor(
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public  productService: ProductService,
    public  authService: AuthService,
    public  route: Router

  ) { }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchAddonsCategory();
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
  fetchAddonsCategory() {
    this.spinner.show();
    this.productService.fetchAddonsCategory().subscribe(data => {
        setTimeout(() => {
          this.categoryData = data;
          this.spinner.hide();
        }, 2000);
      },
      (error : HttpErrorResponse) => {
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
}
