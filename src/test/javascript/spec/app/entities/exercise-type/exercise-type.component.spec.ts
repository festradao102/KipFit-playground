import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { ExerciseTypeComponent } from 'app/entities/exercise-type/exercise-type.component';
import { ExerciseTypeService } from 'app/entities/exercise-type/exercise-type.service';
import { ExerciseType } from 'app/shared/model/exercise-type.model';

describe('Component Tests', () => {
  describe('ExerciseType Management Component', () => {
    let comp: ExerciseTypeComponent;
    let fixture: ComponentFixture<ExerciseTypeComponent>;
    let service: ExerciseTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExerciseTypeComponent],
      })
        .overrideTemplate(ExerciseTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExerciseTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExerciseTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExerciseType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.exerciseTypes && comp.exerciseTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
