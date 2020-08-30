import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../../../Service/Alert/toast.service';

@Component({
  selector: 'app-add-sub-location',
  templateUrl: './add-sub-location.component.html',
  styleUrls: ['./add-sub-location.component.css',
    '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None
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
    public  masterService: MasterService,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.setFormBuilder();
    this.fetchLocation();
  }
  fetchLocation() {
    this.masterService.fetchMainLocation().subscribe(data => {
      this.mainLocationData = data;
    },
      (error : HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // console.log('An error occurred:', error.error.message);
          this.toastService.showError('An error occcured', 'Oops !');
        } else {
          this.toastService.showError('An error occcured', 'Oops !');
          // console.log('Backend returned status code: ', error.status);
          // console.log('Response body:', error.error);
        }
      }
    );
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
  addSublocation() {
    if (this.locationForm.valid) {
      const fd = new FormData();
      Object.keys(this.locationForm.value).forEach(key => {
        fd.append(key, this.locationForm.value[key]);
      });
      this.masterService.addSubLocation(fd).subscribe(res => {
         let ResultSet: any ;
          ResultSet = res;
         if(ResultSet.Status) {
           this.toastService.showSuccess('Successfully Added', 'Success');
           this.locationForm.reset();
         } else {
           this.toastService.showError('Failed to add', 'Oops !');
         }
        },
        (error : HttpErrorResponse) => {
          if (error.error instanceof Error) {
            // console.log('An error occurred:', error.error.message);
            this.toastService.showError('An error occcured', 'Oops !');
          } else {
            this.toastService.showError('An error occcured', 'Oops !');
            // console.log('Backend returned status code: ', error.status);
            // console.log('Response body:', error.error);
          }
        }
      );
    }

  }
  onSubmit() {
    if (this.btn_title === 'Save') {
      this.addSublocation();
    }
  }
}
