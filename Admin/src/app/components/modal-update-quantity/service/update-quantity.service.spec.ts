import { TestBed } from '@angular/core/testing';

import { UpdateQuantityService } from './update-quantity.service';

describe('UpdateQuantityService', () => {
  let service: UpdateQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
