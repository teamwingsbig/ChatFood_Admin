import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-view-sub-location',
  templateUrl: './view-sub-location.component.html',
  styleUrls: ['./view-sub-location.component.css',
  '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewSubLocationComponent implements OnInit {
  locationData: any = [];
  p = 1;
  public filter;
  constructor(
    public  masetrservice: MasterService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.fetchMainLocation();
  }

  fetchMainLocation() {
    this.spinner.show();
    this.masetrservice.fetchSubLocation().subscribe(data => {
        setTimeout(() => {
          this.locationData = data;
          console.log(this. locationData);
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
