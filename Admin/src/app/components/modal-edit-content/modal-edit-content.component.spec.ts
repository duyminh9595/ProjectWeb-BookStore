import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditContentComponent } from './modal-edit-content.component';

describe('ModalEditContentComponent', () => {
  let component: ModalEditContentComponent;
  let fixture: ComponentFixture<ModalEditContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
