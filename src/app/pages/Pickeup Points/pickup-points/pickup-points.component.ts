import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PickupService} from '../../../Service/Database/pickup.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pickup-points',
  templateUrl: './pickup-points.component.html',
  styleUrls: ['./pickup-points.component.css']
})
export class PickupPointsComponent implements OnInit {
  p;
  pickeupData : any = [];
  StatusmodalRef: BsModalRef;
  modalRef: BsModalRef;
  constructor(
    private pickupService: PickupService,
    public  toastService: ToastService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {
    this.loadPickupPoints();
  }

  loadPickupPoints() {
    this.pickupService.getPickeup(false).subscribe(res => {
      this.pickeupData = res;
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
  openStatusModel(template: TemplateRef<any>) {
    this.StatusmodalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  decline(): void {
    this.StatusmodalRef.hide();
  }
  confirm(companyId): void {
    // this.deleteCompany(companyId);
    this.StatusmodalRef.hide();
  }
}
