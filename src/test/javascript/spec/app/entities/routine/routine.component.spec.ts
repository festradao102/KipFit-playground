import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { RoutineComponent } from 'app/entities/routine/routine.component';
import { RoutineService } from 'app/entities/routine/routine.service';
import { Routine } from 'app/shared/model/routine.model';

describe('Component Tests', () => {
  describe('Routine Management Component', () => {
    let comp: RoutineComponent;
    let fixture: ComponentFixture<RoutineComponent>;
    let service: RoutineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [RoutineComponent],
      })
        .overrideTemplate(RoutineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RoutineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RoutineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Routine(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.routines && comp.routines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
