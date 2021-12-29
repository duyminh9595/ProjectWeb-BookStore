import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateQuantityComponent } from './modal-update-quantity.component';

describe('ModalUpdateQuantityComponent', () => {
  let component: ModalUpdateQuantityComponent;
  let fixture: ComponentFixture<ModalUpdateQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
