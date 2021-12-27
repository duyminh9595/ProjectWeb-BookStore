import { TestBed } from '@angular/core/testing';

import { InvoiceBaseonCouponService } from './invoice-baseon-coupon.service';

describe('InvoiceBaseonCouponService', () => {
  let service: InvoiceBaseonCouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceBaseonCouponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
