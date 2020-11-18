import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubscriberComponent } from './dashboardSubscriber.component';

describe('DashboardComponent', () => {
  let component: DashboardSubscriberComponent;
  let fixture: ComponentFixture<DashboardSubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
