import { Component, OnInit } from '@angular/core';
import {MasterService} from '../../../Service/Database/master.service';

@Component({
  selector: 'app-view-main-location',
  templateUrl: './view-main-location.component.html',
  styleUrls: ['./view-main-location.component.css']
})
export class ViewMainLocationComponent implements OnInit {
  locationData: any = [];
  constructor(
    public  masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.fetchMainLocation();
  }

  fetchMainLocation() {
    this.masterService.fetchMainLocation().then(res => {
      this.locationData = res;
      console.log(res);
    }).catch(err => {

    });
  }
}
