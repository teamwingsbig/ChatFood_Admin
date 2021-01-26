import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css', '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCompanyComponent implements OnInit {

  companyForm: FormGroup;
  LogoData: File = null;
  ImageData: File = null;
  title = 'Add Company';
  isModelView = false;
  btn_title = 'Save';
  validation_messages = {
    company_name: [
      {type: 'required', message: 'Name is required.'},
      {type: 'pattern', message: 'Numbers not allowed '}
    ],
    mobile: [
      {type: 'required', message: 'Mobile No is required.'},
      {type: 'pattern', message: 'Characters not allowed '},
      {type: 'maxLength', message: 'Invalid Phone No '}
    ],
    address: [
      {type: 'required', message: 'Address is required.'},
    ],
    landline: [
      {type: 'pattern', message: 'Characters not allowed '},
      {type: 'maxLength', message: 'Invalid Phone No '}
    ],
    email: [
      {type: 'required', message: 'Email is required.'},
    ],
    logo: [
      {type: 'required', message: 'Logo is required.'},
    ],
    backgroundImage: [
      {type: 'required', message: 'Background Image is required.'},
    ],
    trn: [
      {type: 'required', message: 'Trn is required.'},
    ],
    signature: [
      {type: 'required', message: 'Signature is required.'},
    ],
    key: [
      {type: 'required', message: 'Key is required.'},
    ],
  };

  userData: any = [];
  companyId;

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

  ngOnInit(): void {
    this.autherisationProcess();
    this.setFormBuilder();
    this.loadCompanyData();

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
  loadCompanyData() {
    if (this.router.snapshot.paramMap.get('id') != null) {
      this.spinner.show();
      this.companyId = atob(this.router.snapshot.paramMap.get('id'));
      this.masterService.fetchCompany(this.companyId).subscribe(res => {
        let ResultSet: any;
        ResultSet = res;
        if (ResultSet.results.length > 0) {
          setTimeout(() => {

            // update btn and title of the page
            this.btn_title = 'Update';
            this.title = 'Update Company';
            this.isModelView = true;
            // update the item form
            this.companyForm.controls['company_name'].setValue(ResultSet.results[0].company_name);
            this.companyForm.controls['mobile'].setValue(ResultSet.results[0].mobile);
            this.companyForm.controls['address'].setValue(ResultSet.results[0].address);
            this.companyForm.controls['landline'].setValue(ResultSet.results[0].landline);
            this.companyForm.controls['email'].setValue(ResultSet.results[0].email);
            // this.companyForm.controls['logo'].setValue(ResultSet.results[0].logo.image);
            // this.companyForm.controls['backgroundImage'].setValue(ResultSet.results[0].images[0].image);
            this.companyForm.controls['trn_no'].setValue(ResultSet.results[0].trn_no);
            this.companyForm.controls['key_secret'].setValue('');
            this.companyForm.controls['key_id'].setValue('');
            this.spinner.hide();
          }, 500);

        } else {
          this.btn_title = 'Save';
          this.title = 'Add Company';
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
      this.btn_title = 'Save';
      this.title = 'Add Company';
      this.isModelView = false;

    }
  }

  setFormBuilder() {
    // @ts-ignore
    this.companyForm = this.formBuilder.group({
      company_name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      address: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      trn_no: [
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
      landline: [
        '',
        Validators.compose([
          Validators.pattern('^[0-9]*$')
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      logo: [
        [],
        Validators.compose([
          Validators.required,
        ])
      ],
      images: [
        [],
        Validators.compose([
          Validators.required,
        ])
      ],
      key_id: [
        [],
        Validators.compose([
          Validators.required,
        ])
      ],
      key_secret: [
        [],
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }

  onSelectLogo(fileInput: any) {
    if (fileInput.target.files.length > 0) {
      this.LogoData = <File>fileInput.target.files[0];
    }
  }

  onSelectImage(fileInput: any) {
    if (fileInput.target.files.length > 0) {
      this.ImageData = <File>fileInput.target.files[0];
    }
  }

  onSubmit() {
    if (this.btn_title === 'Save') {
      this.addCompany();
    } else if (this.btn_title === 'Update') {
      this.updateCompany();
    }
  }

  addCompany() {
    const formData: any = new FormData();
    if (this.companyForm.valid) {
      this.spinner.show();
      Object.keys(this.companyForm.value).forEach(key => {
        if (key === 'logo') {
          formData.append(key, this.LogoData);

        } else if (key === 'images') {
          formData.append(key, this.ImageData);

        } else {
          formData.append(key, this.companyForm.value[key]);
        }
      });
      this.masterService.addCompany(formData).subscribe(res => {
        setTimeout(() => {
          let ResultSet: any;
          ResultSet = res;
          if (ResultSet.Status) {
            this.toastService.showSuccess('Company Added Successfully', 'Success');
            this.companyForm.reset();
          } else {
            this.toastService.showError(ResultSet.Error, 'Oops !');
          }
          this.spinner.hide();
        }, 500);

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
    }
  }
  updateCompany() {
    const formData: any = new FormData();
    if (this.companyForm.valid) {
      this.spinner.show();
      formData.append('admin_id', '');
      formData.append('id', this.companyId);
      Object.keys(this.companyForm.value).forEach(key => {
        if (key === 'logo') {
          formData.append(key, this.LogoData);

        } else if (key === 'images') {
          formData.append(key, this.ImageData);

        } else {
          formData.append(key, this.companyForm.value[key]);
        }
      });
      this.masterService.updateCompany(formData).subscribe(res => {
        console.log(res);
        setTimeout(() => {
          let ResultSet: any;
          ResultSet = res;
          if (ResultSet.Status) {
            this.toastService.showSuccess('Company Updated Successfully', 'Success');
            this.companyForm.reset();
          } else {
            this.toastService.showError(ResultSet.Error, 'Oops !');
          }
          this.spinner.hide();
        }, 500);

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
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.companyForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

}
