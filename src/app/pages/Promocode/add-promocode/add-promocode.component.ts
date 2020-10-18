import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {PromocodeService} from '../../../Service/Database/promocode.service';

@Component({
  selector: 'app-add-promocode',
  templateUrl: './add-promocode.component.html',
  styleUrls: ['./add-promocode.component.css']
})
export class AddPromocodeComponent implements OnInit {

  promoForm: FormGroup;
  branchData: any = [];
  title = 'Add Promocode';
  btn_title = 'Save';
  userData: any = [];

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
    code: [
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
    this.promoForm = this.formBuilder.group({
      code: [
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
}
