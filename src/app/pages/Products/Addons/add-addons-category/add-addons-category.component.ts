import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../../Service/Database/master.service';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {ProductService} from '../../../../Service/Database/product.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-addons-category',
  templateUrl: './add-addons-category.component.html',
  styleUrls: ['./add-addons-category.component.css',
    '../../../../../assets/CSS/toastr.css'],
  encapsulation : ViewEncapsulation.None
})
export class AddAddonsCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  title = 'Add-ons Category';
  btn_title = 'Save';
  brnachData: any = [];
  validation_messages = {
    name: [
      { type: 'required', message: ' Name is required.' },
      { type: 'pattern', message: 'Numbers not allowed ' }
    ],
    branch_id: [
      { type: 'required', message: 'Brnach is required.' },
      { type: 'pattern', message: 'Numbers not allowed ' }
    ]
  };
  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public toastService: ToastService,
    public  productService: ProductService
  ) { }

  ngOnInit(): void {
    this.setFormBuilder();
    this.fetchBranch();
  }
  fetchBranch() {
    this.masterService.fetchMainLocation().subscribe(data => {
        this.brnachData = data;
      },
      (error : HttpErrorResponse) => {
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
    addCategory () {
      if (this.categoryForm.valid)  {
        this.productService.addAddonsCategory(this.categoryForm.value).subscribe(res => {
            let ResultSet: any ;
            ResultSet = res;
            if(ResultSet.Status) {
              this.toastService.showSuccess('Successfully Added', 'Success');
              this.categoryForm.reset();
            } else {
              this.toastService.showError('Failed to add', 'Oops !');
            }
          },
          (error : HttpErrorResponse) => {
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
    }
  }
}
