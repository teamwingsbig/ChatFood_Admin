import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../../Service/Database/master.service';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProductService} from '../../../../Service/Database/product.service';
import {AuthService} from '../../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit-addons',
  templateUrl: './edit-addons.component.html',
  styleUrls: ['./edit-addons.component.css']
})
export class EditAddonsComponent implements OnInit {
  addonForm: FormGroup;
  public userData: any = [];
  branchData: any = [];
  categoryData: any = [];
  varientData: any = [];
  itemData: any = [];
  validation_messages = {
    name: [
      {type: 'required', message: 'Name is required.'},
      {type: 'pattern', message: 'Invalid Price '}
    ],
    branch_id: [
      {type: 'required', message: 'Branch is required.'},
    ],
    category_id: [
      {type: 'required', message: 'Category is required.'},
    ],
    price: [
      {type: 'required', message: 'Price is required.'},
      {type: 'pattern', message: 'Invalid Price '}
    ],
    varient_id: [
      {type: 'required', message: 'Varient is required.'},
    ],
    is_required: [
      {type: 'required', message: 'Invalid.'},
    ],
    item_id: [
      {type: 'required', message: 'Item is required.'},
    ],
    tax_perc: [
      {type: 'required', message: 'Tax percentage required.'},
      {type: 'pattern', message: 'Invalid tax percentage '}

    ]
  };
  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public  toastService: ToastService,
    private modalService: BsModalService,
    public productService: ProductService,
    public  authService: AuthService,
    public  route: Router,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    this.fetchBranch();
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
  setFormBuilder() {
    this.addonForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      id: [
        ''
      ],
      category_id: [
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
      price: [
        0,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      is_required: [
        0,
      ],
      item_id: [
        '',
      ],
      varient_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      tax_perc: [
        0,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
    });
  }
  fetchAddonsCategory() {
    this.productService.fetchAddonsCategory().subscribe(res => {
      this.categoryData = res;
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
  fetchItemByBranch(branch_id) {
    // [0]id and [1]name are the values
    branch_id = branch_id.split(',')[0];
    this.productService.fetchProductByBranch(branch_id).subscribe(res => {
      this.itemData = res;
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

  fetchVarientByItem(item_id) {
    // [0]id and [1]name are the values
    item_id = item_id.split(',')[0];
    this.productService.fetchVarientByItem(item_id).subscribe(res => {
      this.varientData = res;
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
}
