import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePikeupPointComponent } from './create-pikeup-point.component';

describe('CreatePikeupPointComponent', () => {
  let component: CreatePikeupPointComponent;
  let fixture: ComponentFixture<CreatePikeupPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePikeupPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePikeupPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
