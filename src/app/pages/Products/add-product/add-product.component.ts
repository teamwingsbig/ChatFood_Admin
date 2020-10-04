import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProductService} from '../../../Service/Database/product.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/Authentication/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
  modalRef: BsModalRef;
  title = 'Add Item';
  btn_title = 'Save';
  varient_title = 'Add Varient';
  varient_btn_title = 'Save';
  itemForm: FormGroup;
  varientForm: FormGroup;
  branchData: any = [];
  categoryData: any = [];
  varientData: any = [];
  unitData: any = [];
  previewUrl;
  fileData: File = null;
  public userData: any = [];

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public  toastService: ToastService,
    private modalService: BsModalService,
    public productService: ProductService,
    public  authService: AuthService,
    public  route: Router
  ) {
  }

  validation_messages = {
    name: [
      {type: 'required', message: 'Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    branch_id: [
      {type: 'required', message: 'Branch is required.'},
    ],
    category_id: [
      {type: 'required', message: 'Category is required.'},
    ],
    price_range: [
      {type: 'required', message: 'Price range is required.'},
    ],
    tax_perc: [
      {type: 'required', message: 'Tax Percentage is required.'},
      {type: 'pattern', message: 'Invalid Value '}
    ]
  };
  varient_validation_messages = {
    selling_price: [
      {type: 'required', message: 'Price is required.'},
      {type: 'pattern', message: 'Invalid Price '}
    ],
    unit_id: [
      {type: 'required', message: 'Unit is required.'},
    ],
    magnitude: [
      {type: 'required', message: 'Magnitude is required.'},
      {type: 'pattern', message: 'Invalid Value '}
    ],
    cost_price: [
      {type: 'required', message: 'Price is required.'},
      {type: 'pattern', message: 'Invalid Price '}
    ],
    reorder_point: [
      {type: 'pattern', message: 'Invalid Value '}
    ],
    current_stock: [
      {type: 'required', message: 'Current Stock is required.'},
      {type: 'pattern', message: 'Invalid Value '}
    ],
    name: [
      {type: 'required', message: 'Name is required.'},
    ],
  };

  fileProgress(fileInput: any) {
    if (fileInput.target.files.length > 0) {
      this.fileData = <File>fileInput.target.files[0];
      const size = this.fileData.size;
      if (size <= 10485760) {
        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = _event => {
          this.previewUrl = reader.result;
        };
      } else {
        // this.toast.showErrorTost("Oops !", "File too large !!");
      }
    }

  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.setVarirntForm();
    this.setFormBuilder();
    this.fetchBranch();
    this.fetchUnit();
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

  setVarirntForm() {
    this.varientForm = this.formBuilder.group({
      selling_price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      unit_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      magnitude: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      cost_price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')

        ])
      ],
      reorder_point: [
        '',
        Validators.compose([
          Validators.pattern('^[0-9]*$')
        ])
      ],
      current_stock: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      name: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
    });
  }

  setFormBuilder() {
    this.itemForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      arabic_name: [
        '',
      ],
      branch_id: [
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
      description: [
        '',
      ],
      sku: [
        '',
      ],
      varients: [
        '',
      ],
      price_range: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      images: [
        '',
        Validators.required
      ],
      tax_perc: [
        0,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      uom: [
        0
      ],
    });
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

  fetchCategoryByBranch(branch_id) {
    this.masterService.fetchCategoryByBranch(branch_id).subscribe(res => {
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

  fetchUnit() {
    this.masterService.fetchUnits().subscribe(res => {
      this.unitData = res;
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

  openVarientForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'gray modal-lg'});
  }

//   add varients to table
  addVarients(varientData) {
    if (this.varientForm.valid) {
      const data = {
        'unit_id': varientData.unit_id.split(',')[0],
        'unit_name': varientData.unit_id.split(',')[1],
        'name': varientData.name,
        'magnitude': varientData.magnitude,
        'cost_price': varientData.cost_price,
        'selling_price': varientData.selling_price,
        'current_stock': varientData.current_stock,
        'reorder_point': varientData.reorder_point
      };
      this.varientData.push(data);
      this.varientForm.reset();
      this.toastService.showSuccess('Successfully Added', 'Success');
    }
  }

//  remove varient from table
  removeVarient(index) {
    this.varientData.splice(index, 1);
    this.toastService.showSuccess('Successfully Deleted', 'Success');
  }

  addProduct() {
    if (this.itemForm.valid) {
      let itemFormData: any = new FormData();
      itemFormData.append('varients', this.varientData);
      // this.itemForm.value.varients = [];
      // this.itemForm.value.varients = this.varientData;
      Object.keys(this.itemForm.value).forEach(key => {
        if (key === 'varients') {
          itemFormData.append(key, JSON.stringify(this.varientData));
          console.log(this.varientData);
        } else if (key === 'images') {
          itemFormData.append(key, this.fileData);
        } else {
          itemFormData.append(key, this.itemForm.value[key]);
        }
      });
      this.productService.addProduct(itemFormData).subscribe(res => {
          let ResultSet: any;
          ResultSet = res;
          console.log(res);
          if (ResultSet.Status) {
            this.toastService.showSuccess('Product Successfully Added', 'Success');
            // reset form
            this.itemForm.reset();
            //   reset varient data
            this.varientData = [];
          } else {
            this.toastService.showError('Failed to add Product', 'Oops !');
          }
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
      this.addProduct();
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.itemForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
    return invalid;
  }
}
