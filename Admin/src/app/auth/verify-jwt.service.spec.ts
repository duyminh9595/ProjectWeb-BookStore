import { TestBed } from '@angular/core/testing';

import { VerifyJwtService } from './verify-jwt.service';

describe('VerifyJwtService', () => {
  let service: VerifyJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
