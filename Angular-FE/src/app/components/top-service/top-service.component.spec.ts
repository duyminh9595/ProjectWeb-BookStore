import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopServiceComponent } from './top-service.component';

describe('TopServiceComponent', () => {
  let component: TopServiceComponent;
  let fixture: ComponentFixture<TopServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
