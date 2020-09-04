import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddonsCategoryComponent } from './view-addons-category.component';

describe('ViewAddonsCategoryComponent', () => {
  let component: ViewAddonsCategoryComponent;
  let fixture: ComponentFixture<ViewAddonsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAddonsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddonsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
