import { TestBed } from '@angular/core/testing';

import { InfoAccountService } from './info-account.service';

describe('InfoAccountService', () => {
  let service: InfoAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
