import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMainLocationComponent } from './view-main-location.component';

describe('ViewMainLocationComponent', () => {
  let component: ViewMainLocationComponent;
  let fixture: ComponentFixture<ViewMainLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMainLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMainLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
