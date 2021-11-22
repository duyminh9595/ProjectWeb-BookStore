import { TestBed } from '@angular/core/testing';

import { BookSerService } from './book-ser.service';

describe('BookSerService', () => {
  let service: BookSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
