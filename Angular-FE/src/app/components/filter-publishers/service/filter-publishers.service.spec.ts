import { TestBed } from '@angular/core/testing';

import { FilterPublishersService } from './filter-publishers.service';

describe('FilterPublishersService', () => {
  let service: FilterPublishersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterPublishersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
