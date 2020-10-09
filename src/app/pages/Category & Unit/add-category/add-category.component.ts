import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  title = 'Add Category';
  btn_title = 'Save';
  branchData: any = [];
  public userData: any = [];
  validation_messages = {
    name: [
      {type: 'required', message: 'Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    branch_id: [
      {type: 'required', message: 'Branch is required.'},
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public  toastService: ToastService,
    public authService: AuthService,
    public route: Router,
    public spinner: NgxSpinnerService,

  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.setItemFormBuilder();
    this.fetchBranch();
  }

  setItemFormBuilder() {
    this.categoryForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      branch_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      sku: [
        '',
      ],
      uom: [
        '',
      ],
    });
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
    this.masterService.fetchBranch().subscribe(res => {
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

  addCategory() {
    if (this.categoryForm.valid) {
      const data = {
        branch_id: this.categoryForm.value.branch_id,
        is_available: 1,
        name: this.categoryForm.value.name
      };
      this.spinner.show();
      this.masterService.addCategory(data).subscribe(res => {
        setTimeout(() => {
          let ResultSet: any;
          ResultSet = res;
          console.log(res);
          if (ResultSet.Status) {
            this.toastService.showSuccess('Successfully Added', 'Success');
            this.categoryForm.reset();
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
      this.addCategory();
    } else {

    }
  }

}
