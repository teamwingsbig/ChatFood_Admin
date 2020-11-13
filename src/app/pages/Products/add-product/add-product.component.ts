import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProductService} from '../../../Service/Database/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
  modalRef: BsModalRef;
  deleteModelModalRef: BsModalRef;

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
  productID;
  isModelView = false;

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public  toastService: ToastService,
    private modalService: BsModalService,
    public productService: ProductService,
    public  authService: AuthService,
    public  route: Router,
    public spinner: NgxSpinnerService,
    public  router: ActivatedRoute
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
    this.loadProductandVarients();
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

  loadProductandVarients() {
    if (this.router.snapshot.paramMap.get('id') != null) {
      this.spinner.show();
      this.productID = atob(this.router.snapshot.paramMap.get('id'));
      this.productService.fetchProductByID(this.productID).subscribe(res => {
        let ResultSet: any;
        ResultSet = res;
        if (ResultSet.length > 0) {
          setTimeout(() => {

            // update btn and title of the page
            this.btn_title = 'Update';
            this.title = 'Update Product';
            this.isModelView = true;
            this.varient_title = 'Update Variant';
            this.varient_btn_title = 'Update';
            // update the item form
            this.itemForm.controls['name'].setValue(ResultSet[0].name);
            this.itemForm.controls['arabic_name'].setValue(ResultSet[0].arabic_name);
            this.itemForm.controls['description'].setValue(ResultSet[0].description);
            this.itemForm.controls['sku'].setValue(ResultSet[0].sku);
            this.itemForm.controls['uom'].setValue(ResultSet[0].uom);
            this.itemForm.controls['tax_perc'].setValue(ResultSet[0].tax_perc);
            this.itemForm.controls['price_range'].setValue(ResultSet[0].price_range);
            this.itemForm.controls['branch_id'].setValue(ResultSet[0].branch.id);
            this.fetchCategoryByBranch(ResultSet[0].branch.id);
            this.itemForm.controls['category_id'].setValue(ResultSet[0].category.id);

            // update image
            this.previewUrl = ResultSet[0].images[0].image;
            // update varient array
            this.varientData = ResultSet[0].varients;

            // remove image validation
            this.itemForm.controls['images'].clearValidators();
            this.itemForm.controls['images'].updateValueAndValidity();
            this.spinner.hide();
          }, 500);

        } else {
          this.btn_title = 'Save';
          this.title = 'Add Product';
          this.isModelView = false;
          this.varient_title = 'Add Variant';
          this.varient_btn_title = 'Save';
        }

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
    } else {
      this.btn_title = 'Save';
      this.title = 'Add Product';
      this.isModelView = false;
      this.varient_title = 'Add Variant';
      this.varient_btn_title = 'Save';
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
      id: [
        ''
      ]
    });
  }

  setFormBuilder() {
    this.itemForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required
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
    console.log(varientData);
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
  removeVarient(index, template: TemplateRef<any>) {
    if (this.btn_title === 'Save') {
      //   remove item from the html tale
      this.varientData.splice(index, 1);
      this.toastService.showSuccess('Successfully Deleted', 'Success');
    } else if (this.btn_title === 'Update') {
      // remove item from the database
      this.openDeleteModel(template);
    }

  }

  addProduct() {
    if (this.itemForm.valid) {
      this.spinner.show();
      let itemFormData: any = new FormData();
      itemFormData.append('varients', this.varientData);
      // this.itemForm.value.varients = [];
      // this.itemForm.value.varients = this.varientData;
      Object.keys(this.itemForm.value).forEach(key => {
        if (key === 'varients') {
          itemFormData.append(key, JSON.stringify(this.varientData));
          // console.log(this.varientData);
        } else if (key === 'images') {
          itemFormData.append(key, this.fileData);
        } else {
          itemFormData.append(key, this.itemForm.value[key]);
        }
      });
      this.productService.addProduct(itemFormData).subscribe(res => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = res;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Product Successfully Added', 'Success');
              // reset form
              this.itemForm.reset();
              //   reset varient data
              this.varientData = [];
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

  updateProduct() {
    if (this.itemForm.valid) {
      this.spinner.show();
      let itemFormData: any = new FormData();
      // itemFormData.append('varients', this.varientData);
      itemFormData.append('id', this.productID);
      itemFormData.append('status', '1');
      itemFormData.append('is_showable', '1');

      // this.itemForm.value.varients = [];
      // this.itemForm.value.varients = this.varientData;
      Object.keys(this.itemForm.value).forEach(key => {
        if (key === 'varients') {
          itemFormData.append(key, JSON.stringify(this.varientData));
          // console.log(this.varientData);
        } else if (key === 'images') {
          itemFormData.append(key, this.fileData);
        } else {
          itemFormData.append(key, this.itemForm.value[key]);
        }
      });
      this.productService.updateProduct(itemFormData).subscribe(res => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = res;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Product Successfully Updated', 'Success');
              // reset form
              this.itemForm.reset();
              //   reset varient data
              this.varientData = [];
              this.route.navigate(['/listProducts']);
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

  updateVarients(varientData) {
    if (this.varientForm.valid) {
      const data = {
        'id': varientData.id,
        'unit_id': varientData.unit_id[0],
        'unit_name': varientData.unit_id[1],
        'name': varientData.name,
        'magnitude': varientData.magnitude,
        'cost_price': varientData.cost_price,
        'selling_price': varientData.selling_price,
        'current_stock': varientData.current_stock,
        'reorder_point': varientData.reorder_point
      };
      if (this.varientForm.valid) {
        this.spinner.show();
        this.productService.updateVarients(data).subscribe(res => {
          console.log(res);
          setTimeout(() => {
            let Resultset: any;
            Resultset = res;
            if (Resultset.Status) {
              this.toastService.showSuccess('Updated Successfully', 'Success');
            } else {
              this.toastService.showError(Resultset.Error, 'Oops !');
            }
            this.spinner.hide();
            this.loadProductandVarients();
            this.varientForm.reset();
          }, 500);
        }),
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
  }

  onSubmit() {
    if (this.btn_title === 'Save') {
      this.addProduct();
    } else if (this.btn_title === 'Update') {
      this.updateProduct();
    }
  }

  onSubmitVarient(varientData) {
    if (this.varient_btn_title === 'Save') {
      this.addVarients(varientData);
    } else if (this.varient_btn_title === 'Update') {
      this.updateVarients(varientData);
    }
  }

  editVarient(template: TemplateRef<any>, varients) {
    this.openVarientForm(template);
    this.varientForm.controls['name'].setValue(varients.name);
    this.varientForm.controls['magnitude'].setValue(varients.magnitude);
    this.varientForm.controls['unit_id'].setValue([varients.unit.id, varients.unit.name]);
    this.varientForm.controls['cost_price'].setValue(varients.cost_price);
    this.varientForm.controls['current_stock'].setValue(varients.current_stock);
    this.varientForm.controls['selling_price'].setValue(varients.selling_price);
    this.varientForm.controls['reorder_point'].setValue(varients.reorder_point);
    this.varientForm.controls['id'].setValue(varients.id);

  }
  deleteVareint(varient_id){
    alert('will add soon');
  }

  openDeleteModel(template: TemplateRef<any>) {
    this.deleteModelModalRef = this.modalService.show(template, {class: 'gray modal-lg'});
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
