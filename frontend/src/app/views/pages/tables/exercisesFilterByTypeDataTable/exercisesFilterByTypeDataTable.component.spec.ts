import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesFilterByTypeDataTableComponent } from './exercisesFilterByTypeDataTable.component';

describe('ExercisesFilterByTypeDataTableComponent', () => {
  let component: ExercisesFilterByTypeDataTableComponent;
  let fixture: ComponentFixture<ExercisesFilterByTypeDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisesFilterByTypeDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesFilterByTypeDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
