import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubLocationComponent } from './add-sub-location.component';

describe('AddSubLocationComponent', () => {
  let component: AddSubLocationComponent;
  let fixture: ComponentFixture<AddSubLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
