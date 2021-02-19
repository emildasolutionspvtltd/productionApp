import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCheckoutComponent } from './display-checkout.component';

describe('DisplayCheckoutComponent', () => {
  let component: DisplayCheckoutComponent;
  let fixture: ComponentFixture<DisplayCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
