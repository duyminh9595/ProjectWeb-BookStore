import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddMaGiamGiaComponent } from './modal-add-ma-giam-gia.component';

describe('ModalAddMaGiamGiaComponent', () => {
  let component: ModalAddMaGiamGiaComponent;
  let fixture: ComponentFixture<ModalAddMaGiamGiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddMaGiamGiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddMaGiamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
