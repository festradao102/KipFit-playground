import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExerciseInRoutineComponent } from './viewExerciseInRoutine.component';

describe('ViewExerciseInRoutineComponent', () => {
  let component: ViewExerciseInRoutineComponent;
  let fixture: ComponentFixture<ViewExerciseInRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExerciseInRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExerciseInRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
