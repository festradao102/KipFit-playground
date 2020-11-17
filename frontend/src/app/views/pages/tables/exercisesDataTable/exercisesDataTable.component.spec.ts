import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesDataTableComponent} from './exercisesDataTable.component';

describe('ExercisesDataTableComponent', () => {
  let component: ExercisesDataTableComponent;
  let fixture: ComponentFixture<ExercisesDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisesDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
