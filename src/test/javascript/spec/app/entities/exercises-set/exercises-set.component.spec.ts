import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { ExercisesSetComponent } from 'app/entities/exercises-set/exercises-set.component';
import { ExercisesSetService } from 'app/entities/exercises-set/exercises-set.service';
import { ExercisesSet } from 'app/shared/model/exercises-set.model';

describe('Component Tests', () => {
  describe('ExercisesSet Management Component', () => {
    let comp: ExercisesSetComponent;
    let fixture: ComponentFixture<ExercisesSetComponent>;
    let service: ExercisesSetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExercisesSetComponent],
      })
        .overrideTemplate(ExercisesSetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExercisesSetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExercisesSetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExercisesSet(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.exercisesSets && comp.exercisesSets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
