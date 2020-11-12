import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MeasurementsDataTableComponent} from './measurementsDataTable.component';

describe('MeasurementsDataTableComponent', () => {
  let component: MeasurementsDataTableComponent;
  let fixture: ComponentFixture<MeasurementsDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementsDataTableComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
