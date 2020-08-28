import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';

@Component({
  selector: 'app-add-main-location',
  templateUrl: './add-main-location.component.html',
  styleUrls: ['./add-main-location.component.css']
})
export class AddMainLocationComponent implements OnInit {
  locationForm: FormGroup;
  title = 'Add Main Location';
  btn_title = 'Save' ;
  validation_messages = {
    name: [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Numbers not allowed ' }
    ]
  };
  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.setFormBuilder();
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
    });
  }
  addLocation() {
      alert(JSON.stringify(this.locationForm.value));
      if (this.locationForm.valid) {
        const fd = new FormData();
        Object.keys(this.locationForm.value).forEach(key=>{
          fd.append(key, this.locationForm.value[key]);
        });
        this.masterService.addMainLocation(fd).then(res => {
          let ResultSet: any ;
          ResultSet = res;
          console.log(ResultSet);
          if (ResultSet.Status === true) {
              this.locationForm.reset();
          }
        }).catch(err => {

        });
      }
  }
  onSubmit() {
      if (this.btn_title === 'Save') {
        this.addLocation();
      } else {

      }
  }
}
