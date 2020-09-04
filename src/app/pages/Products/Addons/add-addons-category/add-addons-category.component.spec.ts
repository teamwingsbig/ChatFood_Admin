import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddonsCategoryComponent } from './add-addons-category.component';

describe('AddAddonsCategoryComponent', () => {
  let component: AddAddonsCategoryComponent;
  let fixture: ComponentFixture<AddAddonsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAddonsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAddonsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
