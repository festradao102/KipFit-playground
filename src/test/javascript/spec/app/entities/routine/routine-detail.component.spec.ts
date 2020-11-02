import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { RoutineDetailComponent } from 'app/entities/routine/routine-detail.component';
import { Routine } from 'app/shared/model/routine.model';

describe('Component Tests', () => {
  describe('Routine Management Detail Component', () => {
    let comp: RoutineDetailComponent;
    let fixture: ComponentFixture<RoutineDetailComponent>;
    const route = ({ data: of({ routine: new Routine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [RoutineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RoutineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RoutineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load routine on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.routine).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
