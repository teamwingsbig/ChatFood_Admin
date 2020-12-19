import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../Service/Alert/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
    '../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  validation_messages = {
    username: [
      {type: 'required', message: 'Username is required.'},
    ],
    password: [
      {type: 'required', message: 'password is required.'},
    ]
  };

  constructor
  (
    public formBuilder: FormBuilder,
    public  authService: AuthService,
    public  router: Router,
    public  toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.setFormBuilder();
  }

  ngOnDestroy() {
  }

  setFormBuilder() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required,
          Validators.minLength(3)]
      ],
      password: [
        '',
        [Validators.required,
          Validators.minLength(5)]
      ]
    });
  }

  Login() {
    if (this.loginForm.valid) {
      this.authService.clearUserDetails();
      // const fd = new FormData();
      // Object.keys(this.loginForm.value).forEach(key => {
      //   fd.append(key, this.loginForm.value[key]);
      // });
      this.authService.login(this.loginForm.value).subscribe(res => {
        if (res['Status']) {
          // success
          this.authService.setToLoggedIn();
          this.authService.setUserDetails(res['user_id'], res['name'], res['is_superuser'], res['is_staff'], res['mobile'], res['email'], res['token'], this.getUserType(res));
          this.router.navigate(['/dashboard']);
        } else {
          //   fail
          this.toastService.showError('Invalid username or password', 'Oops !');
        }

        // tslint:disable-next-line:no-unused-expression
      }), (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('An error occurred:', error.error.message);
        } else {
          console.log('Backend returned status code: ', error.status);
          console.log('Response body:', error.error);
        }
      };
    }
  }

  getUserType(Result) {
    if (Result['is_superuser']) {
      // superuser
      return 0;
    } else if (Result['prvlged_branches'].length > 0) {
      // branch manager
      return 2;
    } else if (Result['prvlged_companies'].length > 0) {
      // company admin
      return 1;
    }
  }
}
