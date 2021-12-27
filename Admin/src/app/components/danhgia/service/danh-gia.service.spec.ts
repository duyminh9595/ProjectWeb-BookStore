import { TestBed } from '@angular/core/testing';

import { DanhGiaService } from './danh-gia.service';

describe('DanhGiaService', () => {
  let service: DanhGiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhGiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
