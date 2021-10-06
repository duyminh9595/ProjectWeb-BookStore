import { TestBed } from '@angular/core/testing';

import { LoadBookInHomePageService } from './load-book-in-home-page.service';

describe('LoadBookInHomePageService', () => {
  let service: LoadBookInHomePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadBookInHomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
