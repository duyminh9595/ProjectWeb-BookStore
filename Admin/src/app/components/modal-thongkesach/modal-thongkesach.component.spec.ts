import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalThongkesachComponent } from './modal-thongkesach.component';

describe('ModalThongkesachComponent', () => {
  let component: ModalThongkesachComponent;
  let fixture: ComponentFixture<ModalThongkesachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalThongkesachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalThongkesachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
