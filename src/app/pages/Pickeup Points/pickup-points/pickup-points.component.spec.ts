import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupPointsComponent } from './pickup-points.component';

describe('PickupPointsComponent', () => {
  let component: PickupPointsComponent;
  let fixture: ComponentFixture<PickupPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
