import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ListPlanComponent} from './routinesPlanDataTable.component';

describe('ListPlanComponent', () => {
    let component: ListPlanComponent;
    let fixture: ComponentFixture<ListPlanComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ListPlanComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListPlanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
