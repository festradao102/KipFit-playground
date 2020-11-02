import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { ExercisesSetTypeComponent } from 'app/entities/exercises-set-type/exercises-set-type.component';
import { ExercisesSetTypeService } from 'app/entities/exercises-set-type/exercises-set-type.service';
import { ExercisesSetType } from 'app/shared/model/exercises-set-type.model';

describe('Component Tests', () => {
  describe('ExercisesSetType Management Component', () => {
    let comp: ExercisesSetTypeComponent;
    let fixture: ComponentFixture<ExercisesSetTypeComponent>;
    let service: ExercisesSetTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExercisesSetTypeComponent],
      })
        .overrideTemplate(ExercisesSetTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExercisesSetTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExercisesSetTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExercisesSetType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.exercisesSetTypes && comp.exercisesSetTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
