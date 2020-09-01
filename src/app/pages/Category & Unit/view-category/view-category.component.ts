import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css',
  '../../../../assets/CSS/toastr.css'],
  encapsulation : ViewEncapsulation.None
})
export class ViewCategoryComponent implements OnInit {
  categotyData: any = [];

  p = 1;
  public filter;
  constructor(
    public  maserservice: MasterService,
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.fetchcategoty();
  }
  fetchcategoty() {
    this.spinner.show();
    this.maserservice.fetchCategory().subscribe(res => {
      setTimeout(() => {
        this.categotyData = res;
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
}
