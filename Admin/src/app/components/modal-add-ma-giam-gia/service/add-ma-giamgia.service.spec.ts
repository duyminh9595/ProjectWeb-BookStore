import { TestBed } from '@angular/core/testing';

import { AddMaGiamgiaService } from './add-ma-giamgia.service';

describe('AddMaGiamgiaService', () => {
  let service: AddMaGiamgiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMaGiamgiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
