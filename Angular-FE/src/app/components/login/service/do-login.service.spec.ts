import { TestBed } from '@angular/core/testing';

import { DoLoginService } from './do-login.service';

describe('DoLoginService', () => {
  let service: DoLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
