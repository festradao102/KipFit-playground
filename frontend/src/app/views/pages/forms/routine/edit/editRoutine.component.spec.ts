import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditRoutineComponent} from './editRoutine.component';

describe('EditSubscriberComponent', () => {
  let component: EditRoutineComponent;
  let fixture: ComponentFixture<EditRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoutineComponent ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });
});
