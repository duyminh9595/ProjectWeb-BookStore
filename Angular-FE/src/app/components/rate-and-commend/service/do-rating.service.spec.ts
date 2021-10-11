import { TestBed } from '@angular/core/testing';

import { DoRatingService } from './do-rating.service';

describe('DoRatingService', () => {
  let service: DoRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
