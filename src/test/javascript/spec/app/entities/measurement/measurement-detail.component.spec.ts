import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { MeasurementDetailComponent } from 'app/entities/measurement/measurement-detail.component';
import { Measurement } from 'app/shared/model/measurement.model';

describe('Component Tests', () => {
  describe('Measurement Management Detail Component', () => {
    let comp: MeasurementDetailComponent;
    let fixture: ComponentFixture<MeasurementDetailComponent>;
    const route = ({ data: of({ measurement: new Measurement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [MeasurementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MeasurementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MeasurementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load measurement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.measurement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
