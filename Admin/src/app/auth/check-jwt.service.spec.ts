import { TestBed } from '@angular/core/testing';

import { CheckJwtService } from './check-jwt.service';

describe('CheckJwtService', () => {
  let service: CheckJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
