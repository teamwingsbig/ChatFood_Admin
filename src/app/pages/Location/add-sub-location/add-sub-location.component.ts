import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';

@Component({
  selector: 'app-add-sub-location',
  templateUrl: './add-sub-location.component.html',
  styleUrls: ['./add-sub-location.component.css']
})
export class AddSubLocationComponent implements OnInit {
  locationForm: FormGroup;
  title = 'Add Sub Location';
  btn_title = 'Save' ;
  mainLocationData: any = [];
  validation_messages = {
    name: [
      { type: 'required', message: 'Location Name is required.' },
      { type: 'pattern', message: 'Numbers not allowed ' }
    ],
    parent_location_id: [
      { type: 'required', message: 'Location Name is required.' },
      { type: 'pattern', message: 'Numbers not allowed ' }
    ]
  };
  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.setFormBuilder();
    this.fetchLocation();
  }
  fetchLocation() {
    this.masterService.fetchMainLocation().then(res => {
        this.mainLocationData = res;
    }).catch(err => {

    });
  }
  setFormBuilder() {
    this.locationForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      parent_location_id: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

}
