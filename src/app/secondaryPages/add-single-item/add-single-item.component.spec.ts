import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleItemComponent } from './add-single-item.component';

describe('AddSingleItemComponent', () => {
  let component: AddSingleItemComponent;
  let fixture: ComponentFixture<AddSingleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSingleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
