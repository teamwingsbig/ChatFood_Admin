import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ToastService} from '../../../Service/Alert/toast.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductService} from '../../../Service/Database/product.service';
import {HttpErrorResponse} from '@angular/common/http';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation : ViewEncapsulation.None
})
export class ListProductComponent implements OnInit {
  productData: any = [];
  p = 1;
  public filter;
  modalRef: BsModalRef;
  constructor(
    public toastService: ToastService,
    public spinner: NgxSpinnerService,
    public productService: ProductService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {
      this.fetchProducts();
  }
  fetchProducts() {
    this.spinner.show();
    this.productService.fetchProduct().subscribe(res => {
      setTimeout(() => {
        this.productData = res;
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
  openVarients(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class : 'gray modal-lg'});
  }

}
