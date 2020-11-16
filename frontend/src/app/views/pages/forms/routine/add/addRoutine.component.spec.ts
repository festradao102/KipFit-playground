import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoutineComponent } from './addRoutine.component';

describe('AddSubscriberComponent', () => {
  let component: AddRoutineComponent;
  let fixture: ComponentFixture<AddRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
