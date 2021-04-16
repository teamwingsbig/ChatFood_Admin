import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../Service/Database/master.service';
import {ToastService} from '../../Service/Alert/toast.service';
import {AuthService} from '../../Service/Authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  constructor( public formBuilder: FormBuilder,
               public  masterService: MasterService,
               public toastService: ToastService,
               public  authService: AuthService,
               public  route: Router,
               public spinner: NgxSpinnerService,
               public  router: ActivatedRoute) { }
  userProfile: FormGroup;
  validation_messages = {
    first_name: [
      {type: 'required', message: 'Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    mobile: [
      {type: 'required', message: 'Mobile No is required.'},
      {type: 'pattern', message: 'Characters not allowed '},
      {type: 'maxLength', message: 'Invalid Phone No '}
    ],
    address: [
      {type: 'required', message: 'Address is required.'},
    ],
    email: [
      {type: 'required', message: 'Email is required.'},
    ],
    username: [
      {type: 'required', message: 'username is required.'},
    ],
  };
  userData: any = [];

  ngOnInit() {
    this.autherisationProcess();
    this.setFormBuilder();
    this.loadCompanyProfile();
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
  setFormBuilder() {
    this.userProfile = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      username: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      email: [
        '',
        Validators.compose([Validators.email])
      ],
      address: [
        ''
      ],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^((\\\\+91-?)|0)?[0-9]{10}$')
        ])
      ],

    });
  }
  loadCompanyProfile() {
    this.spinner.show();
    this.masterService.fetchUserProfile().subscribe(res => {
      setTimeout(() => {
        let ResultSet: any;
        ResultSet = res;
        if (ResultSet.results.length > 0) {
          this.userProfile.controls['name'].setValue(ResultSet.results[0].first_name);
          this.userProfile.controls['username'].setValue(ResultSet.results[0].username);
          this.userProfile.controls['email'].setValue(ResultSet.results[0].email);
          this.userProfile.controls['mobile'].setValue(ResultSet.results[0].details.mobile);
          this.userProfile.controls['email'].setValue(ResultSet.results[0].email);
          if(ResultSet.results[0].address.length > 0) {
            console.log('sadsad');
          }
          this.userProfile.controls['trn_no'].setValue(ResultSet.results[0].trn_no);
        }
        this.spinner.hide();
      }, 500);

    }), (error: HttpErrorResponse) => {
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
  updateProfile() {
    if (this.userProfile.valid) {
      this.spinner.show();
      const formData: any = new FormData();
      Object.keys(this.userProfile.value).forEach(key => {
        formData.append(key, this.userProfile.value[key]);
      });
      this.masterService.updateProfile(formData).subscribe(res => {
        setTimeout(() => {
          let ResultSet: any;
          ResultSet = res;
          if (ResultSet.Status) {
            this.toastService.showSuccess('User Details Updates Successfully', 'Success');
            this.userProfile.reset();
            this.loadCompanyProfile();
          } else {
            this.toastService.showError(ResultSet.Error, 'Oops !');
          }
          this.spinner.hide();
        }, 500);

      }), (error: HttpErrorResponse) => {
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

}
