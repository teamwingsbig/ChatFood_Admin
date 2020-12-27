import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../../Service/Database/master.service';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {ProductService} from '../../../../Service/Database/product.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../../Service/Authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-addons-category',
  templateUrl: './add-addons-category.component.html',
  styleUrls: ['./add-addons-category.component.css',
    '../../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddAddonsCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  title = 'Add-ons Category';
  btn_title = 'Save';
  branchData: any = [];
  public userData: any = [];
  public categoryID;
  validation_messages = {
    name: [
      {type: 'required', message: ' Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    branch_id: [
      {type: 'required', message: 'Brnach is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public toastService: ToastService,
    public  productService: ProductService,
    public  authService: AuthService,
    public  route: Router,
    public spinner: NgxSpinnerService,
    public  router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    this.loadBranch();
    this.loadCategoryData();
  }


  loadCategoryData() {
    if (this.router.snapshot.paramMap.get('id') != null
      && this.router.snapshot.paramMap.get('name') != null
      && this.router.snapshot.paramMap.get('branch_id') != null) {
      this.title = ' Update Add-ons Category';
      this.btn_title = 'Update';
      this.categoryID = atob(this.router.snapshot.paramMap.get('id'));
      this.categoryForm.controls['name'].setValue(atob(this.router.snapshot.paramMap.get('name')));
      this.categoryForm.controls['branch_id'].setValue(atob(this.router.snapshot.paramMap.get('branch_id')));
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

  loadBranch() {
    if (this.userData.user_type === 1) {
      this.fetchBranchByCompanyID();
    } else if (this.userData.user_type === 2) {
      this.fetchBranchByID();
    }
  }
  fetchBranchByID() {
    this.masterService.fetchBranchByID(this.userData.branch_id).subscribe(res => {
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

  fetchBranchByCompanyID() {
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
    this.categoryForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      branch_id: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this.spinner.show();
      this.productService.addAddonsCategory(this.categoryForm.value).subscribe(res => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = res;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Successfully Added', 'Success');
              this.categoryForm.reset();
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
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      this.spinner.show();
      const Data = {
        id: this.categoryID,
        name: this.categoryForm.value.name,
        branch_id: this.categoryForm.value.branch_id
      };
      this.productService.updateAddonsCategory(Data).subscribe(res => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = res;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Successfully Updated', 'Success');
              this.categoryForm.reset();
              this.route.navigate(['/addAddonsCategory']);
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
  }

  onSubmit() {
    if (this.btn_title === 'Save') {
      this.addCategory();
    } else {
      this.updateCategory();
    }
  }
}
