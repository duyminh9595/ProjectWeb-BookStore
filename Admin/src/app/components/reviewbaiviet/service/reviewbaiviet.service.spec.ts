import { TestBed } from '@angular/core/testing';

import { ReviewbaivietService } from './reviewbaiviet.service';

describe('ReviewbaivietService', () => {
  let service: ReviewbaivietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewbaivietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
