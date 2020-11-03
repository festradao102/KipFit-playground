import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { GuidedTrainingComponent } from 'app/entities/guided-training/guided-training.component';
import { GuidedTrainingService } from 'app/entities/guided-training/guided-training.service';
import { GuidedTraining } from 'app/shared/model/guided-training.model';

describe('Component Tests', () => {
  describe('GuidedTraining Management Component', () => {
    let comp: GuidedTrainingComponent;
    let fixture: ComponentFixture<GuidedTrainingComponent>;
    let service: GuidedTrainingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [GuidedTrainingComponent],
      })
        .overrideTemplate(GuidedTrainingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GuidedTrainingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GuidedTrainingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GuidedTraining(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.guidedTrainings && comp.guidedTrainings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
