import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { ExercisesSetTypeDetailComponent } from 'app/entities/exercises-set-type/exercises-set-type-detail.component';
import { ExercisesSetType } from 'app/shared/model/exercises-set-type.model';

describe('Component Tests', () => {
  describe('ExercisesSetType Management Detail Component', () => {
    let comp: ExercisesSetTypeDetailComponent;
    let fixture: ComponentFixture<ExercisesSetTypeDetailComponent>;
    const route = ({ data: of({ exercisesSetType: new ExercisesSetType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExercisesSetTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExercisesSetTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExercisesSetTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load exercisesSetType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.exercisesSetType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
