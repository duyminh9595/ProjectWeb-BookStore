import { TestBed } from '@angular/core/testing';

import { LoadCartBaseOnEmailService } from './load-cart-base-on-email.service';

describe('LoadCartBaseOnEmailService', () => {
  let service: LoadCartBaseOnEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadCartBaseOnEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
