import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsIndexComponent } from './list-products-index.component';

describe('ListProductsIndexComponent', () => {
  let component: ListProductsIndexComponent;
  let fixture: ComponentFixture<ListProductsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
