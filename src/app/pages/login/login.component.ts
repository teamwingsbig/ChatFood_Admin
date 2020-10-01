import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupName, Validators} from '@angular/forms';
import {AuthService} from '../../Service/Authentication/auth.service';
import {Route, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    public  router : Router
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
      // const fd = new FormData();
      // Object.keys(this.loginForm.value).forEach(key => {
      //   fd.append(key, this.loginForm.value[key]);
      // });
      this.authService.login(this.loginForm.value).subscribe(res => {

        this.authService.setToLoggedIn();
        this.authService.setUserDetails(res['user_id'], res['name'], false, false, res['mobile'], res['email'], res['token']);
        this.router.navigate(['\dashboard']);
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
}
