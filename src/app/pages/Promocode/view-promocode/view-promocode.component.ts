import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../Service/Authentication/auth.service';
import {Router} from '@angular/router';
import {PromocodeService} from '../../../Service/Database/promocode.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-view-promocode',
  templateUrl: './view-promocode.component.html',
  styleUrls: ['./view-promocode.component.css', '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None

})
export class ViewPromocodeComponent implements OnInit {
  modalRef: BsModalRef;
  promoCodeData: any = [];
  public userData: any = [];
  p = 1;
  public filter;

  constructor(
    public  promoService: PromocodeService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    private modalService: BsModalService,
    public  authServie: AuthService,
    public route: Router
  ) {
  }

  ngOnInit(): void {
    this.autherisationProcess();
    this.fetchPromocode();
  }

  public autherisationProcess() {
    // is logged in
    if (this.authServie.isLoggedIn()) {
      // is admin or not
      this.userData = this.authServie.getUserDetails();
      // if (this.userData.UserType != 0) {
      //   // navigate to loggin page
      //   this.route.navigate(["/dashboard"]);
      // }
    } else {
      // navigate to loggin page
      this.route.navigate(['/login']);
    }
  }

  fetchPromocode() {
    this.spinner.show();
    this.promoService.fetchPromocode().subscribe(res => {
      setTimeout(() => {
        this.promoCodeData = res;
        this.promoCodeData = this.promoCodeData.results;
        this.spinner.hide();
      }, 2000);
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
}
