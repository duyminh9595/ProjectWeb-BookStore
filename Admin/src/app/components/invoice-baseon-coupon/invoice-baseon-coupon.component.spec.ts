import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBaseonCouponComponent } from './invoice-baseon-coupon.component';

describe('InvoiceBaseonCouponComponent', () => {
  let component: InvoiceBaseonCouponComponent;
  let fixture: ComponentFixture<InvoiceBaseonCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceBaseonCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBaseonCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
