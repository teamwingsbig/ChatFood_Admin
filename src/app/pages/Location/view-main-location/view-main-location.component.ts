import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {MasterService} from '../../../Service/Database/master.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-main-location',
  templateUrl: './view-main-location.component.html',
  styleUrls: ['./view-main-location.component.css',
  '../../../../assets/CSS/toastr.css'],
  encapsulation : ViewEncapsulation.None
})
export class ViewMainLocationComponent implements OnInit {
  locationData: any = [];
  modalRef: BsModalRef;
  p = 1;
  public filter;
  constructor(
    public  masetrservice: MasterService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.fetchMainLocation();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, );
  }
  fetchMainLocation() {
    this.spinner.show();
    this.masetrservice.fetchMainLocation().subscribe(data => {
        setTimeout(() => {
          this.locationData = data;
          this.spinner.hide();
        }, 2000);
      },
      (error : HttpErrorResponse) => {
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
