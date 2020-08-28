import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainLocationComponent } from './add-main-location.component';

describe('AddMainLocationComponent', () => {
  let component: AddMainLocationComponent;
  let fixture: ComponentFixture<AddMainLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMainLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMainLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
