import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminComponent } from './dashboardAdmin.component';

// @ts-ignore
describe('DashboardComponent', () => {
  let component: DashboardAdminComponent;
  let fixture: ComponentFixture<DashboardAdminComponent>;

  // @ts-ignore
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAdminComponent ]
    })
    .compileComponents();
  }));

  // @ts-ignore
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
