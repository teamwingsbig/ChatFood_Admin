import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../../Service/Alert/toast.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-sub-location',
  templateUrl: './add-sub-location.component.html',
  styleUrls: ['./add-sub-location.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddSubLocationComponent implements OnInit {
  locationForm: FormGroup;
  title = 'Add Sub Location';
  btn_title = 'Save';
  mainLocationData: any = [];
  public userData: any = [];

  validation_messages = {
    name: [
      {type: 'required', message: 'Location Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    parent_location_id: [
      {type: 'required', message: 'Location Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public toastService: ToastService,
    public  authService: AuthService,
    public  route: Router,
    public spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    this.fetchLocation();
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

  fetchLocation() {
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

  setFormBuilder() {
    this.locationForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      parent_location_id: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  addSublocation() {
    if (this.locationForm.valid) {
      this.spinner.show();
      const fd = new FormData();
      Object.keys(this.locationForm.value).forEach(key => {
        fd.append(key, this.locationForm.value[key]);
      });
      this.masterService.addSubLocation(fd).subscribe(res => {
          setTimeout(() => {
            let ResultSet: any;
            ResultSet = res;
            if (ResultSet.Status) {
              this.toastService.showSuccess('Successfully Added', 'Success');
              this.locationForm.reset();
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
      this.addSublocation();
    }
  }
}
