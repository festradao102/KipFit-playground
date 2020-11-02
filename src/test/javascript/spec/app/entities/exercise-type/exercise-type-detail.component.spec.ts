import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { ExerciseTypeDetailComponent } from 'app/entities/exercise-type/exercise-type-detail.component';
import { ExerciseType } from 'app/shared/model/exercise-type.model';

describe('Component Tests', () => {
  describe('ExerciseType Management Detail Component', () => {
    let comp: ExerciseTypeDetailComponent;
    let fixture: ComponentFixture<ExerciseTypeDetailComponent>;
    const route = ({ data: of({ exerciseType: new ExerciseType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExerciseTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExerciseTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExerciseTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load exerciseType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.exerciseType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
