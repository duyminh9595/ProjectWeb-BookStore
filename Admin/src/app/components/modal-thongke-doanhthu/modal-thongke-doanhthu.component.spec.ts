import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalThongkeDoanhthuComponent } from './modal-thongke-doanhthu.component';

describe('ModalThongkeDoanhthuComponent', () => {
  let component: ModalThongkeDoanhthuComponent;
  let fixture: ComponentFixture<ModalThongkeDoanhthuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalThongkeDoanhthuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalThongkeDoanhthuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
