import { TestBed } from '@angular/core/testing';

import { DoUpdateService } from './do-update.service';

describe('DoUpdateService', () => {
  let service: DoUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
