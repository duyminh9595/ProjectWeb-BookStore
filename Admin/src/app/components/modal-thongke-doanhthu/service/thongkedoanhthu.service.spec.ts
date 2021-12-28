import { TestBed } from '@angular/core/testing';

import { ThongkedoanhthuService } from './thongkedoanhthu.service';

describe('ThongkedoanhthuService', () => {
  let service: ThongkedoanhthuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongkedoanhthuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
