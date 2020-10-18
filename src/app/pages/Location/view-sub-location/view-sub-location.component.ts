import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-sub-location',
  templateUrl: './view-sub-location.component.html',
  styleUrls: ['./view-sub-location.component.css',
  '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewSubLocationComponent implements OnInit {
  locationData: any = [];
  p = 1;
  public filter;
  public userData : any = [];

  constructor(
    public  masetrservice: MasterService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public  authService: AuthService,
    public  route: Router

  ) { }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchMainLocation();
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

  fetchMainLocation() {
    this.spinner.show();
    this.masetrservice.fetchSubLocation().subscribe(data => {
        setTimeout(() => {
          this.locationData = data;
          this.spinner.hide();
        }, 2000);
      },
      (error : HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
          this.spinner.hide();
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          console.log('Backend returned status code: ', error.status);
          console.log('Response body:', error.error);
        }
      }
    );
  }
}
