import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {PromocodeService} from '../../../Service/Database/promocode.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-promocode',
  templateUrl: './add-promocode.component.html',
  styleUrls: ['./add-promocode.component.css', '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddPromocodeComponent implements OnInit {

  promoForm: FormGroup;
  branchData: any = [];
  title = 'Add Promocode';
  btn_title = 'Save';
  userData: any = [];
  selectedBranch = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public toastService: ToastService,
    public  authService: AuthService,
    public  route: Router,
    public spinner: NgxSpinnerService,
    public  promoService: PromocodeService
  ) {
  }

  validation_messages = {
    promo_code: [
      {type: 'required', message: 'Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    recurrence: [
      {type: 'required', message: 'Recurrence is required.'},
      {type: 'pattern', message: 'Characters not allowed '},
      {type: 'maxLength', message: 'Invalid value '}
    ],
    disc_perc: [
      {type: 'required', message: 'Discount is required.'},
      {type: 'pattern', message: 'Characters not allowed '},
      {type: 'maxLength', message: 'Invalid value '}
    ],
    disc_price: [
      {type: 'required', message: 'Discount is required.'},
      {type: 'required', message: 'Discount is required.'},
      {type: 'pattern', message: 'Characters not allowed '},
      {type: 'maxLength', message: 'Invalid value '}
    ],
    exp_date: [
      {type: 'required', message: 'Date is required.'},
    ],
    disc_type: [
      {type: 'required', message: 'Choose any one.'},
    ],
    branch_list: [
      {type: 'required', message: 'Branch is required.'},
    ],
  };
  testArray = [{id: 1, name: 'ss'}, {id: 1, name: 'ss'}, {id: 1, name: 'ss'},];

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    this.fetchBranch();
    this.setupDropdownSettings();
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
    this.promoForm = this.formBuilder.group({
      promo_code: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      recurrence: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      exp_date: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      disc_price: [
        0,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      disc_perc: [
        0,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      branch_list: [
        [],
      ],
      disc_type: [
        'perc',
      ]
    });
  }

  setupDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
  }

  onBranchSelect(items) {
    // push selected item to array
    // alert(items.id);
    this.selectedBranch.push(items.id);
  }

  onSelectAll(items: any) {
    // push all selected items to array
    for (let item of items) {
      this.selectedBranch.push(item.id);
    }
  }

  onBranchDeselect(items: any) {
    // pop selected item from array
    const foundIndex = this.selectedBranch.findIndex(({id}) => id === items.id);
    // avoid dublication of data from array
    this.selectedBranch = this.selectedBranch.filter((_, index) => index !== foundIndex);
  }

  onDeSelectAll(items: any) {
    // pop all items from aray
    this.selectedBranch = [];
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

  addPrmocode() {
    if (this.promoForm.valid) {
      if (this.selectedBranch.length > 0) {
        this.promoForm.value.branch_list = this.selectedBranch;
        console.log(this.promoForm.value);
        this.promoService.addPromocode(this.promoForm.value).subscribe(res => {
          console.log(res);
          let ResultSet: any;
          ResultSet = res;
          if (ResultSet.Status) {
            this.toastService.showSuccess('Promocode Successfully Added', 'Success');
            this.promoForm.reset();
          } else {
            this.toastService.showError(ResultSet.Error.toU, 'Oops !');
          }
        }, (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            // console.log('An error occurred:', error.error.message);
            this.toastService.showError('An error occcured', 'Oops !');
          } else {
            this.toastService.showError('An error occcured', 'Oops !');
            // console.log('Backend returned status code: ', error.status);
            // console.log('Response body:', error.error);
          }
        });
      } else {
        this.toastService.showError('No Branch Selected', 'Oops !');
      }
    }
  }

  onSubmit() {
    alert(this.btn_title);
    if (this.btn_title === 'Save') {
      this.addPrmocode();
    }
  }
}
