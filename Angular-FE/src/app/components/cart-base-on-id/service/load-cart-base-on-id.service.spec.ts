import { TestBed } from '@angular/core/testing';

import { LoadCartBaseOnIdService } from './load-cart-base-on-id.service';

describe('LoadCartBaseOnIdService', () => {
  let service: LoadCartBaseOnIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadCartBaseOnIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
