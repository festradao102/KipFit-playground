import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditExercisesSetComponent} from './editExercisesSet.component';

describe('EditSubscriberComponent', () => {
  let component: EditExercisesSetComponent;
  let fixture: ComponentFixture<EditExercisesSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExercisesSetComponent ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExercisesSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });
});
