import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductService} from '../../../../Service/Database/product.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-view-addons',
  templateUrl: './view-addons.component.html',
  styleUrls: ['./view-addons.component.css',
  '../../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewAddonsComponent implements OnInit {

  addonsData: any = [];
  p = 1;
  public filter;
  constructor(
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public  productService: ProductService
  ) { }

  ngOnInit(): void {
    this.fetchAddons();
  }
  fetchAddons() {
    this.spinner.show();
    this.productService.fetchAddons().subscribe(data => {
        setTimeout(() => {
          this.addonsData = data;
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
