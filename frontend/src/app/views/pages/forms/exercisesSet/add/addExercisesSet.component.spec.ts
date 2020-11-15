import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExercisesSetComponent } from './addExercisesSet.component';

describe('AddSubscriberComponent', () => {
  let component: AddExercisesSetComponent;
  let fixture: ComponentFixture<AddExercisesSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExercisesSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExercisesSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
