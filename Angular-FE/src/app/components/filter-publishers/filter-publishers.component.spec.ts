import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPublishersComponent } from './filter-publishers.component';

describe('FilterPublishersComponent', () => {
  let component: FilterPublishersComponent;
  let fixture: ComponentFixture<FilterPublishersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPublishersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
