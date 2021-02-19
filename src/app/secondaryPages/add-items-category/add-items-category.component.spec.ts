import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsCategoryComponent } from './add-items-category.component';

describe('AddItemsCategoryComponent', () => {
  let component: AddItemsCategoryComponent;
  let fixture: ComponentFixture<AddItemsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
