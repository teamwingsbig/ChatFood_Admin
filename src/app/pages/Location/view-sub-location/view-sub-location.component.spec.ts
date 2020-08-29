import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubLocationComponent } from './view-sub-location.component';

describe('ViewSubLocationComponent', () => {
  let component: ViewSubLocationComponent;
  let fixture: ComponentFixture<ViewSubLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
