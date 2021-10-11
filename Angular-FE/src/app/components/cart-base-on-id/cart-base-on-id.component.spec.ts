import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBaseOnIdComponent } from './cart-base-on-id.component';

describe('CartBaseOnIdComponent', () => {
  let component: CartBaseOnIdComponent;
  let fixture: ComponentFixture<CartBaseOnIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartBaseOnIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBaseOnIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
