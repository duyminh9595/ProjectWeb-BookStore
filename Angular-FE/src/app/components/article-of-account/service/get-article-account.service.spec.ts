import { TestBed } from '@angular/core/testing';

import { GetArticleAccountService } from './get-article-account.service';

describe('GetArticleAccountService', () => {
  let service: GetArticleAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetArticleAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
