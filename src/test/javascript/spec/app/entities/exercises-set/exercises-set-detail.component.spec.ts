import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { ExercisesSetDetailComponent } from 'app/entities/exercises-set/exercises-set-detail.component';
import { ExercisesSet } from 'app/shared/model/exercises-set.model';

describe('Component Tests', () => {
  describe('ExercisesSet Management Detail Component', () => {
    let comp: ExercisesSetDetailComponent;
    let fixture: ComponentFixture<ExercisesSetDetailComponent>;
    const route = ({ data: of({ exercisesSet: new ExercisesSet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExercisesSetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExercisesSetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExercisesSetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load exercisesSet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.exercisesSet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
