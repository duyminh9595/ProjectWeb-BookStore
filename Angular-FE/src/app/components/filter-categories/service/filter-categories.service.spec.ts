import { TestBed } from '@angular/core/testing';

import { FilterCategoriesService } from './filter-categories.service';

describe('FilterCategoriesService', () => {
  let service: FilterCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
