import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubChartsComponent } from './subCharts.component';

describe('ChartjsComponent', () => {
  let component: SubChartsComponent;
  let fixture: ComponentFixture<SubChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
