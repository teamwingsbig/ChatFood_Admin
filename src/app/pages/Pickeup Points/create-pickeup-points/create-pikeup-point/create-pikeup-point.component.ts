import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../../Service/Database/master.service';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {AuthService} from '../../../../Service/Authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';
import {PickupService} from '../../../../Service/Database/pickup.service';

@Component({
  selector: 'app-create-pikeup-point',
  templateUrl: './create-pikeup-point.component.html',
  styleUrls: ['./create-pikeup-point.component.css']
})
export class CreatePikeupPointComponent implements OnInit {

  editMode = false;
  pickupForm: FormGroup;
  mainLocationData: any = [];
  subLocationData: any = [];
  branchData: any = [];
  userData: any = [];
  isModelView = false;
  pickupPointId;
  validation_messages = {
    name: [
      {type: 'required', message: ' Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    branch_id: [
      {type: 'required', message: 'Branch  is required.'},
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
    mobile: [
      {type: 'required', message: 'Mobile is required.'},
      {type: 'pattern', message: 'Invalid Mobile no '}

    ],
    estimated_time: [
      {type: 'required', message: 'Estimated time is required.'},
    ],
  };

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public pickupSrvice: PickupService,
    public  toastService: ToastService,
    public  authService: AuthService,
    public  route: Router,
    public  router: ActivatedRoute,
    public spinner: NgxSpinnerService,
    public pickupService: PickupService
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    this.fetchMainLocation();
    this.loadBranch();
    this.loadPickupPoints();
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
    this.pickupForm = this.formBuilder.group({
      name: [
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
      sub_address: [
        '',
      ],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^((\\\\+91-?)|0)?[0-9]{10}$')
        ])
      ],
      estimated_time: [
        '',
        Validators.compose([
          Validators.required, ])
      ],
      id: [],
    });
  }

  loadPickupPoints() {
    if (this.router.snapshot.paramMap.get('id') != null) {
      this.spinner.show();
      this.pickupPointId = atob(this.router.snapshot.paramMap.get('id'));
      this.pickupService.getPickeupById(this.pickupPointId).subscribe(res => {
        let ResultSet: any;
        ResultSet = res;
        if (ResultSet.results.length > 0) {
          setTimeout(() => {
            this.editMode = true;
            // update btn and title of the page
            this.isModelView = true;
            // update the item form
            this.pickupPointId = ResultSet.results[0].id;
            this.pickupForm.controls['name'].setValue(ResultSet.results[0].name);
            this.pickupForm.controls['address'].setValue(ResultSet.results[0].address);
            this.pickupForm.controls['main_location_id'].setValue(ResultSet.results[0].main_location.id);
            this.fetchSublocation(ResultSet.results[0].main_location.id);
            this.pickupForm.controls['sub_location_id'].setValue(ResultSet.results[0].sub_location.id);
            this.pickupForm.controls['branch_id'].setValue(ResultSet.results[0].branch.id);
            this.pickupForm.controls['mobile'].setValue(ResultSet.results[0].mobile);
            this.pickupForm.controls['estimated_time'].setValue(ResultSet.results[0].estimated_time);
            this.spinner.hide();
          }, 500);

        } else {
          this.isModelView = false;
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
     this.editMode = false;
      this.isModelView = false;

    }
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
  fetchBranchbyCompanyID() {
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


  addPickup() {
    if (this.pickupForm.valid) {
      this.pickupService.addPickup(this.pickupForm.value).subscribe((res: any) => {
          setTimeout(() => {
            if (res.Status) {
              this.toastService.showSuccess('Successfully Added', 'Success');
              this.route.navigate(['/pickup-points']);
            } else {
              this.toastService.showError('Failed to add', 'Oops !');
            }
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
  editPickup() {
    if (this.pickupForm.valid) {
      this.pickupForm.value.id = this.pickupPointId;
      this.pickupService.editPickup(this.pickupForm.value).subscribe((res: any) => {
          setTimeout(() => {
            if (res.Status) {
              this.toastService.showSuccess('Successfully Updated', 'Success');
              this.route.navigate(['/pickup-points']);
            } else {
              this.toastService.showError('Failed to Update', 'Oops !');
            }
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
  loadBranch() {
    if (this.userData.user_type === 1) {
      this.fetchBranchbyCompanyID();
    } else if (this.userData.user_type === 2) {
      this.fetchBranchByID();
    }
  }

  onSubmit() {
    if (this.editMode) {
    this.editPickup();
    } else {
      this.addPickup();
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.pickupForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
