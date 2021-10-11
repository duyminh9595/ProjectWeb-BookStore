import { TestBed } from '@angular/core/testing';

import { DoPostArticleService } from './do-post-article.service';

describe('DoPostArticleService', () => {
  let service: DoPostArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoPostArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
