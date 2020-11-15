import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddBranchComponent implements OnInit {

  branchForm: FormGroup;
  mainLocationData: any = [];
  subLocationData: any = [];
  title = 'Add Branch';
  btn_title = 'Save';
  userData: any = [];
  branchID;

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public toastService: ToastService,
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
    mobile: [
      {type: 'required', message: 'Mobile No is required.'},
      {type: 'pattern', message: 'Charecters not allowed '},
      {type: 'maxLength', message: 'Invalid Phone No '}
    ],
    main_location_id: [
      {type: 'required', message: 'Main Location is required.'},
    ],
    sub_location_id: [
      {type: 'required', message: 'Sub Location is required.'},
    ],
    address: [
      {type: 'required', message: 'Address is required.'},
    ],
    email: [
      {type: 'required', message: 'Email is required.'},
    ],
    trn: [
      {type: 'required', message: 'Trn is required.'},
    ],
    minimum_order: [
      {type: 'required', message: 'Minimum Order   is required.'},
      {type: 'pattern', message: 'Invalid Order No '}
    ],
    estimated_time: [
      {type: 'required', message: 'Estimated time   is required.'},
    ],
    tax_type: [
      {type: 'required', message: 'Estimated time   is required.'},
    ]
  };

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    //   fetch main location
    this.fetchMainLocation();
    this.loadBranchDetails();
  }

  loadBranchDetails() {
    if (this.router.snapshot.paramMap.get('id') != null) {
      this.spinner.show();
      this.branchID = atob(this.router.snapshot.paramMap.get('id'));
      this.masterService.fetchBranchByID(this.branchID).subscribe(res => {
        let ResultSet: any;
        ResultSet = res;
        if (ResultSet.length > 0) {
          setTimeout(() => {

            // update btn and title of the page
            this.btn_title = 'Update';
            this.title = 'Update Branch';

            // update the item form
            this.branchForm.controls['name'].setValue(ResultSet[0].name);
            this.branchForm.controls['address'].setValue(ResultSet[0].address);
            this.branchForm.controls['mobile'].setValue(ResultSet[0].mobile);
            this.branchForm.controls['email'].setValue(ResultSet[0].email);
            this.branchForm.controls['trn'].setValue(ResultSet[0].trn);
            this.branchForm.controls['minimum_order'].setValue(ResultSet[0].minimum_order);
            this.branchForm.controls['estimated_time'].setValue(ResultSet[0].estimated_time);
            this.branchForm.controls['tax_type'].setValue(ResultSet[0].tax_type);
            this.branchForm.controls['main_location_id'].setValue(ResultSet[0].main_location.id);
            this.fetchSublocation(ResultSet[0].main_location.id);
            this.branchForm.controls['sub_location_id'].setValue(ResultSet[0].sub_location.id);

            this.spinner.hide();
          }, 500);

        } else {
          this.btn_title = 'Save';
          this.title = 'Add Branch';

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
      this.title = 'Add Branch';
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

  setFormBuilder() {
    this.branchForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      minimum_order: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      main_location_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      sub_location_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      address: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      estimated_time: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      trn: [
        '',
        Validators.compose([])
      ],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      tax_type: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      currency: [
        'indian rupees',
        Validators.compose([
          Validators.required,
        ])
      ],
      id: []
    });
  }

  fetchMainLocation() {
    this.masterService.fetchMainLocation().subscribe(data => {
        this.mainLocationData = data;
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

  fetchSublocation(parent_location_id) {
    this.masterService.fetchSubLocationByMainLocation(parent_location_id).subscribe(data => {
        this.subLocationData = data;
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

  addBrnach() {
    if (this.branchForm.valid) {
      this.spinner.show();
      this.masterService.addBranch(this.branchForm.value).subscribe(data => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = data;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Successfully Added', 'Success');
              this.branchForm.reset();
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

  updateBranch() {
    if (this.branchForm.valid) {
      this.spinner.show();
      this.branchForm.value.id = this.branchID;
      this.masterService.updateBranch(this.branchForm.value).subscribe(data => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = data;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Successfully Updated', 'Success');
              this.branchForm.reset();
              this.route.navigate(['/viewBranch']);
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
      this.addBrnach();
    } else if (this.btn_title === 'Update') {
      this.updateBranch();
    }
  }
}
