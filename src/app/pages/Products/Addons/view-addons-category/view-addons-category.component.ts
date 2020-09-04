import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastService} from '../../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductService} from '../../../../Service/Database/product.service';

@Component({
  selector: 'app-view-addons-category',
  templateUrl: './view-addons-category.component.html',
  styleUrls: ['./view-addons-category.component.css',
  '../../../../../assets/CSS/toastr.css'],
  encapsulation : ViewEncapsulation.None
})
export class ViewAddonsCategoryComponent implements OnInit {
  categoryData: any = [];
  p = 1;
  public filter;
  constructor(
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public  productService: ProductService
  ) { }

  ngOnInit(): void {
    this.fetchAddonsCategory();
  }
  fetchAddonsCategory() {
    this.spinner.show();
    this.productService.fetchAddonsCategory().subscribe(data => {
        setTimeout(() => {
          this.categoryData = data;
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
