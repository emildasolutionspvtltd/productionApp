import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTransactionComponent } from './accept-transaction.component';

describe('AcceptTransactionComponent', () => {
  let component: AcceptTransactionComponent;
  let fixture: ComponentFixture<AcceptTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
