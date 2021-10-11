import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleOfAccountComponent } from './article-of-account.component';

describe('ArticleOfAccountComponent', () => {
  let component: ArticleOfAccountComponent;
  let fixture: ComponentFixture<ArticleOfAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleOfAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
