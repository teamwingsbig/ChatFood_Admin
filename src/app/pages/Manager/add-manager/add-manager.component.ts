import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddManagerComponent implements OnInit {
  branchData: any = [];
  managerForm: FormGroup;
  title = 'Add Manager';
  btn_title = 'Save';
  public userData: any = [];

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public  toastService: ToastService,
    public  authService: AuthService,
    public  route: Router,
    public spinner: NgxSpinnerService,
  ) {
  }

  validation_messages = {
    name: [
      {type: 'required', message: 'Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    email: [
      {type: 'required', message: 'Email address is required.'},
      {type: 'pattern', message: 'Invalid email address '}
    ],
    branch_id: [
      {type: 'required', message: 'Branch is required.'},
    ],
    Total_Amount: [
      {type: 'required', message: 'Amount is required.'},
    ],
    mobile: [
      {type: 'required', message: 'Phone No is required.'},
      {type: 'pattern', message: 'Invalid Phone No'}
    ],
    address1: [
      {type: 'required', message: 'Address Boy  is required.'},
    ],
    username: [
      {type: 'required', message: 'Username   is required.'},
    ],
    password: [
      {type: 'required', message: 'Password  is required.'},
    ]
  };

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    this.fetchBranch();
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

  fetchBranch() {
    this.masterService.fetchBranchByCompanyID(this.userData.company_id).subscribe(res => {
      this.branchData = res;
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

  setFormBuilder() {
    this.managerForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      branch_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      address1: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      username: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      keyword: [
        'add_manager'
      ]
    });
  }

  addManager() {
    if (this.managerForm.valid) {
      this.spinner.show();
      const fd = new FormData();
      Object.keys(this.managerForm.value).forEach(key => {
        fd.append(key, this.managerForm.value[key]);
      });
      this.masterService.addManager(this.managerForm.value).subscribe(res => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = res;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Successfully Added', 'Success');
              this.managerForm.reset();
            } else {
              this.toastService.showError('Failed to add category', 'Oops !');
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
  }

  onSubmit() {
    if (this.btn_title === 'Save') {
      this.addManager();
    }
  }
}
