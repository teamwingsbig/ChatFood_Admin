import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';
import set = Reflect.set;

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None

})
export class CompanyProfileComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public toastService: ToastService,
    public  authService: AuthService,
    public  route: Router,
    public spinner: NgxSpinnerService,
    public  router: ActivatedRoute
  ) {

  }

  companyForm: FormGroup;

  validation_messages = {
    company_name: [
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
    landline: [
      {type: 'pattern', message: 'Characters not allowed '},
      {type: 'maxLength', message: 'Invalid Phone No '}
    ],
    email: [
      {type: 'required', message: 'Email is required.'},
    ],
    trn: [
      {type: 'required', message: 'Trn is required.'},
    ],
  };

  userData: any = [];
  companyId;

  ngOnInit(): void {
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
    this.companyForm = this.formBuilder.group({
      company_name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      address: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      trn_no: [
        '',
        Validators.compose([])
      ],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      landline: [
        '',
        Validators.compose([
          Validators.pattern('^[0-9]*$')
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }

  loadCompanyProfile() {
    this.spinner.show();
    this.masterService.fetchCompany(this.userData.company_id).subscribe(res => {
      setTimeout(() => {
        let ResultSet: any;
        ResultSet = res;
        if (ResultSet.results.length > 0) {
            this.companyId = ResultSet.results[0].id;
          this.companyForm.controls['company_name'].setValue(ResultSet.results[0].company_name);
          this.companyForm.controls['address'].setValue(ResultSet.results[0].address);
          this.companyForm.controls['mobile'].setValue(ResultSet.results[0].mobile);
          this.companyForm.controls['landline'].setValue(ResultSet.results[0].landline);
          this.companyForm.controls['email'].setValue(ResultSet.results[0].email);
          this.companyForm.controls['trn_no'].setValue(ResultSet.results[0].trn_no);
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

  updateCompanyProfile() {
    alert(this.companyId);
    const formData: any = new FormData();
    if (this.companyForm.valid) {
      formData.append('id', this.companyId);
      Object.keys(this.companyForm.value).forEach(key => {
        formData.append(key, this.companyForm.value[key]);
      });
      this.spinner.show();
      this.masterService.updateCompanyProfile(formData).subscribe(res => {
        setTimeout(() => {
          let ResultSet: any;
          ResultSet = res;
          if (ResultSet.Status) {
            this.toastService.showSuccess('Updated Successfully', 'Success');
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

  public findInvalidControls() {
    const invalid = [];
    const controls = this.companyForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
