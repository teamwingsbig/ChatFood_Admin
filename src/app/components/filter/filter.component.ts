import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() hasBranch: boolean = false;
  @Input() statusData: any = [];
  @Input() branchData: any = [];
  @Input() status;

  @Output() onFilter: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClear: EventEmitter<any> = new EventEmitter<any>();


  branch = 'all';
  orderType = 'all';

  constructor() {
  }

  ngOnInit(): void {
  }


  open() {
    document.getElementById('mySidenav').style.width = '350px';
    // document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    // document.getElementById('main').style.marginLeft = '0';
    document.body.style.backgroundColor = 'white';
  }


  onClickFilter() {
    this.closeNav();
    const data = {status: this.status, orderType: this.orderType, branch: this.branch};
    this.onFilter.emit(data);
  }


  onClickClear() {
    this.branch = 'all';
    this.status = 'all';
    this.orderType = 'all';
    this.onClear.emit();
  }
}
