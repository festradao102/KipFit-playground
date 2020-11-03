import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { MeasurementComponent } from 'app/entities/measurement/measurement.component';
import { MeasurementService } from 'app/entities/measurement/measurement.service';
import { Measurement } from 'app/shared/model/measurement.model';

describe('Component Tests', () => {
  describe('Measurement Management Component', () => {
    let comp: MeasurementComponent;
    let fixture: ComponentFixture<MeasurementComponent>;
    let service: MeasurementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [MeasurementComponent],
      })
        .overrideTemplate(MeasurementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeasurementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeasurementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Measurement(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.measurements && comp.measurements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
