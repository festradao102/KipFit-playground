import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SubscriberProfileComponent} from './subscriberProfile.component';

describe('SubscriberProfileComponent', () => {
    let component: SubscriberProfileComponent;
    let fixture: ComponentFixture<SubscriberProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SubscriberProfileComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriberProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
