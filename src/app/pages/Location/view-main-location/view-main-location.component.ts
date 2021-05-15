import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {MasterService} from '../../../Service/Database/master.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {AuthService} from '../../../Service/Authentication/auth.service';

@Component({
  selector: 'app-view-main-location',
  templateUrl: './view-main-location.component.html',
  styleUrls: ['./view-main-location.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewMainLocationComponent implements OnInit {
  locationData: any = [];
  modalRef: BsModalRef;
  p = 1;
  public filter;
  public userData: any = [];
  constructor(
    public  masetrservice: MasterService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    private modalService: BsModalService,
    public  authService: AuthService,
    public  route: Router
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchMainLocation();
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  openViewModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  decline(): void {
    this.modalRef.hide();
  }
  confirm(id): void {
    this.deleteMainLocation(id);
    this.modalRef.hide();
  }
  deleteMainLocation(id) {
    console.log((id));
  }
  fetchMainLocation() {
    // this.spinner.show();
    this.masetrservice.fetchMainLocation().subscribe(data => {
        // setTimeout(() => {
          this.locationData = data;
          // this.spinner.hide();
        // }, 2000);
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          console.log('Backend returned status code: ', error.status);
          console.log('Response body:', error.error);
        }
      }
    );
  }
}
