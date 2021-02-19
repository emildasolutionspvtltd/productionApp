import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckoutComponent } from './add-checkout.component';

describe('AddCheckoutComponent', () => {
  let component: AddCheckoutComponent;
  let fixture: ComponentFixture<AddCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
