import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesSetDataTableComponent } from './exercisesSetDataTable.component';

describe('SubscriberTableComponent', () => {
  let component: ExercisesSetDataTableComponent;
  let fixture: ComponentFixture<ExercisesSetDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisesSetDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesSetDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
