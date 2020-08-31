import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MasterService} from '../../../Service/Database/master.service';
import {ToastService} from '../../../Service/Alert/toast.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css',
  '../../../../assets/CSS/toastr.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddBranchComponent implements OnInit {

  branchForm: FormGroup;
  mainLocationData : any = [];
  subLocationData: any = [];
  title = 'Add Branch';
  btn_title = 'Save' ;
  constructor(
    public formBuilder: FormBuilder,
    public  masterService: MasterService,
    public toastService: ToastService
  ) { }

  validation_messages = {
    name: [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Numbers not allowed ' }
    ],
    mobile: [
      { type: 'required', message: 'Mobile No is required.' },
      { type: 'pattern', message: 'Charecters not allowed ' },
      { type: 'maxLength', message: 'Invalid Phone No ' }
    ],
    main_location_id: [
      { type: 'required', message: 'Main Location is required.' },
    ],
    sub_location_id: [
      { type: 'required', message: 'Sub Location is required.' },
    ],
    address: [
      { type: 'required', message: 'Address is required.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
    ],
    trn: [
      { type: 'required', message: 'Trn is required.' },
    ],
    minimum_order: [
      { type: 'required', message: 'Minimum Order   is required.' },
      { type: 'pattern', message: 'Invalid Order No ' }
    ],
    estimated_time: [
      { type: 'required', message: 'Estimated time   is required.' },
    ]
  };

  ngOnInit(): void {
    this.setFormBuilder();
  //   fetch main location
    this.fetchMainLocation();
  }
  setFormBuilder() {
    this.branchForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      minimum_order: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      main_location_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      sub_location_id: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      address: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      estimated_time: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      trn: [
        '',
        Validators.compose([
        ])
      ],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }
  fetchMainLocation() {
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
  fetchSublocation(parent_location_id) {
    this.masterService.fetchSubLocationByMainLocation(parent_location_id).subscribe(data => {
        this.subLocationData = data;
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
  addBrnach() {
    if(this.branchForm.valid) {
      this.masterService.addBranch(this.branchForm.value).subscribe(data => {
          let ResultSet: any ;
          ResultSet = data;
          if (ResultSet.Status) {
            this.toastService.showSuccess('Successfully Added', 'Success');
            this.branchForm.reset();
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
        this.addBrnach();
    }
  }
}
