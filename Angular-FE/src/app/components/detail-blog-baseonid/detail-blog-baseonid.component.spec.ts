import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlogBaseonidComponent } from './detail-blog-baseonid.component';

describe('DetailBlogBaseonidComponent', () => {
  let component: DetailBlogBaseonidComponent;
  let fixture: ComponentFixture<DetailBlogBaseonidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBlogBaseonidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBlogBaseonidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
