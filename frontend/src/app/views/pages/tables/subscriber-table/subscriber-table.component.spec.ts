import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberTableComponent } from './subscriber-table.component';

describe('SubscriberTableComponent', () => {
  let component: SubscriberTableComponent;
  let fixture: ComponentFixture<SubscriberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
