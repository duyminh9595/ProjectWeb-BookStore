import { TestBed } from '@angular/core/testing';

import { ThongkeService } from './thongke.service';

describe('ThongkeService', () => {
  let service: ThongkeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongkeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
