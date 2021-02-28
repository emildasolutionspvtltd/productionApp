import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagNotificationComponent } from './bag-notification.component';

describe('BagNotificationComponent', () => {
  let component: BagNotificationComponent;
  let fixture: ComponentFixture<BagNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
