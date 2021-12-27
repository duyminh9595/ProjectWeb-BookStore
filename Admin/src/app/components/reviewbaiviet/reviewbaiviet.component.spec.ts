import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewbaivietComponent } from './reviewbaiviet.component';

describe('ReviewbaivietComponent', () => {
  let component: ReviewbaivietComponent;
  let fixture: ComponentFixture<ReviewbaivietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewbaivietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewbaivietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
