import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpieredComponent } from './expiered.component';

describe('ExpieredComponent', () => {
  let component: ExpieredComponent;
  let fixture: ComponentFixture<ExpieredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpieredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpieredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
