import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineDataTableComponent } from './routineDataTable.component';

describe('SubscriberTableComponent', () => {
  let component: RoutineDataTableComponent;
  let fixture: ComponentFixture<RoutineDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
