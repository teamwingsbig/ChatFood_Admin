import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../../Service/Database/master.service';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProductService} from '../../../../Service/Database/product.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-addons',
  templateUrl: './add-addons.component.html',
  styleUrls: ['./add-addons.component.css',
  '../../../../../assets/CSS/toastr.css'],
  encapsulation : ViewEncapsulation.None
})
export class AddAddonsComponent implements OnInit {

  title = 'Add Item';
  btn_title = 'Save';
  addons_title = 'Add Varient';
  addons_btn_title = 'Save';
  branchData: any = [];
  categoryData: any = [];
  varientData: any = [];
  addonsData: any = [];
  modalRef: BsModalRef;
  addonForm: FormGroup;
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
  };
  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public  toastService: ToastService,
    private modalService: BsModalService,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.setFormBuilder();
    this.fetchBranch();
    this.fetchAddonsCategory();
  }
  setFormBuilder() {
    this.addonForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
        ])
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
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      is_required: [
        '',
      ],
      item_id: [
        '',
      ],
      varient_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ]
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
  openAddonsForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'gray modal-lg'});
  }
}
