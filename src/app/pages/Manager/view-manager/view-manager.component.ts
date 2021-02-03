import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-manager',
  templateUrl: './view-manager.component.html',
  styleUrls: ['./view-manager.component.css']
})
export class ViewManagerComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
  ) { }
  brnachData;
  public filter;
  p = 1;
  modalRef: BsModalRef;
  StatusmodalRef: BsModalRef;
  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, );
  }
  decline(): void {
    this.StatusmodalRef.hide();
  }
  confirm(promocodeId): void {
    this.StatusmodalRef.hide();
  }
  openStatusModel(template: TemplateRef<any>) {
    this.StatusmodalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

}
