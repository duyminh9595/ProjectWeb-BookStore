import { TestBed } from '@angular/core/testing';

import { TrimWhiteSpaceService } from './trim-white-space.service';

describe('TrimWhiteSpaceService', () => {
  let service: TrimWhiteSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrimWhiteSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
