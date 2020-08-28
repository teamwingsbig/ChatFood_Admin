import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {

  managerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
  ) { }

  validation_messages = {
    Customer_Name: [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Numbers not allowed ' }
    ],
    Order_ID: [
      { type: 'required', message: 'Order ID is required.' },
      { type: 'pattern', message: 'Charecters not allowed ' }
    ],
    Delivery_Address: [
      { type: 'required', message: 'Address is required.' },
    ],
    Total_Amount: [
      { type: 'required', message: 'Amount is required.' },
    ],
    Contact_No: [
      { type: 'required', message: 'Phone No is required.' },
      { type: 'maxlength', message: 'Maximum 10 numbers is allowed' }
    ],
    DeliverBoy_ID: [
      { type: 'required', message: 'Delivery Boy  is required.' },
    ]
  };
  ngOnInit(): void {
    this.setFormBuilder();
  }
  setFormBuilder() {
    this.managerForm = this.formBuilder.group({
      Customer_Name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      Order_ID: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      Delivery_Address: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      Total_Amount: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
      ],
      Contact_No: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$')
        ])
      ],
      DeliverBoy_ID: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }

}
