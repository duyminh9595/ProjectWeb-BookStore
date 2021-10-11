import { TestBed } from '@angular/core/testing';

import { GetblogidService } from './getblogid.service';

describe('GetblogidService', () => {
  let service: GetblogidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetblogidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
