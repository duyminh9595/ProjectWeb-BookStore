import { TestBed } from '@angular/core/testing';

import { BillingAccountService } from './billing-account.service';

describe('BillingAccountService', () => {
  let service: BillingAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
