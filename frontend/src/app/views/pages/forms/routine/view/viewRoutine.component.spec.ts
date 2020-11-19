import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ViewRoutineComponent} from './viewRoutine.component';

describe('ViewRoutineComponent', () => {
  let component: ViewRoutineComponent;
  let fixture: ComponentFixture<ViewRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRoutineComponent ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });
});
