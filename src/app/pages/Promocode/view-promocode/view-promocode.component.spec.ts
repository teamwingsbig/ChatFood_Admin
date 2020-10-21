import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPromocodeComponent } from './view-promocode.component';

describe('ViewPromocodeComponent', () => {
  let component: ViewPromocodeComponent;
  let fixture: ComponentFixture<ViewPromocodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPromocodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
