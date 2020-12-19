import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

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
    logo: [
      {type: 'required', message: 'Logo is required.'},
    ],
    backgroundImage: [
      {type: 'required', message: 'Background Image is required.'},
    ],
    trn: [
      {type: 'required', message: 'Trn is required.'},
    ],
  };

  userData: any = [];
  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public toastService: ToastService,
    public  authService: AuthService,
    public  route: Router,
    public spinner: NgxSpinnerService,
    public  router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();

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
    // @ts-ignore
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
      ],
      logo: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      backgroundImage: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }


  addCompany() {
    if (this.companyForm.valid) {
      this.spinner.show();
      this.masterService.addCompany(this.companyForm.value).subscribe(res => {
        setTimeout(() => {
          let ResultSet: any;
          ResultSet = res;
          console.log(this.companyForm.value);
          console.log((res));
          console.log((ResultSet.Status));
          if (ResultSet.Status) {
            this.toastService.showSuccess('Company Added Successfully', 'Success');
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
