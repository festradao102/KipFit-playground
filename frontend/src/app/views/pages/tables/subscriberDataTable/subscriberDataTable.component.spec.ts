import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberDataTableComponent } from './subscriberDataTable.component';

describe('SubscriberTableComponent', () => {
  let component: SubscriberDataTableComponent;
  let fixture: ComponentFixture<SubscriberDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
