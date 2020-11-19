import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRoutineComponent } from './single-routine.component';

describe('SingleRoutineComponent', () => {
  let component: SingleRoutineComponent;
  let fixture: ComponentFixture<SingleRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
