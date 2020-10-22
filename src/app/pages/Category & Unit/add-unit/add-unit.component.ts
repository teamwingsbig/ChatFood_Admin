import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddUnitComponent implements OnInit {
  unitForm: FormGroup;
  title = 'Add Unit';
  btn_title = 'Save';
  branchData: any = [];
  public userData: any = [];
  public unitID;
  validation_messages = {
    name: [
      {type: 'required', message: 'Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    branch_id: [
      {type: 'required', message: 'Branch is required.'},
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public  toastService: ToastService,
    public authService: AuthService,
    public route: Router,
    public spinner: NgxSpinnerService,
    public  router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    this.fetchBranch();
    this.loadUnitData();
  }

  loadUnitData() {
    if (this.router.snapshot.paramMap.get('id') != null
      && this.router.snapshot.paramMap.get('name') != null
      && this.router.snapshot.paramMap.get('branch_id') != null) {
      this.title = ' Update Unit';
      this.btn_title = 'Update';
      this.unitID = atob(this.router.snapshot.paramMap.get('id'));
      this.unitForm.controls['name'].setValue(atob(this.router.snapshot.paramMap.get('name')));
      this.unitForm.controls['branch_id'].setValue(atob(this.router.snapshot.paramMap.get('branch_id')));
    }
  }

  setFormBuilder() {
    this.unitForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      branch_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
    });
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

  addUnit() {
    if (this.unitForm.valid) {
      this.spinner.show();
      this.masterService.addUnit(this.unitForm.value).subscribe(res => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = res;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Successfully Added', 'Success');
              this.unitForm.reset();
            } else {
              this.toastService.showError('Failed to add category', 'Oops !');
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
  updateUnit() {
    if (this.unitForm.valid) {
      this.spinner.show();
      const fd = new FormData();
      fd.append('id', this.unitID);
      Object.keys(this.unitForm.value).forEach(key => {
        fd.append(key, this.unitForm.value[key]);
      });
      this.masterService.updateUnit(fd).subscribe(res => {
          setTimeout(() => {

            let ResultSet: any;
            ResultSet = res;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Successfully Updated', 'Success');
              this.unitForm.reset();
              this.route.navigate(['/addUnit']);

            } else {
              this.toastService.showError('Failed to add', 'Oops !');
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
      this.addUnit();
    } else {
          this.updateUnit();
    }
  }

}
