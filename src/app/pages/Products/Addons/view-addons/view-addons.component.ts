import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductService} from '../../../../Service/Database/product.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../../../Service/Authentication/auth.service';

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

  constructor(
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public  productService: ProductService,
    public  authService: AuthService,
    public  route: Router
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.loadAddons();
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

  fetchAddons() {
    this.spinner.show();
    this.productService.fetchAddons().subscribe(data => {
        setTimeout(() => {
          this.addonsData = data;
          this.spinner.hide();
        }, 2000);
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
    this.spinner.show();
    this.productService.fetchAddons(this.userData.branch_id).subscribe(data => {
        setTimeout(() => {
          this.addonsData = data;
          this.spinner.hide();
        }, 2000);
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
}
