import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsBulkComponent } from './add-items-bulk.component';

describe('AddItemsBulkComponent', () => {
  let component: AddItemsBulkComponent;
  let fixture: ComponentFixture<AddItemsBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemsBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemsBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
