import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { GuidedTrainingUpdateComponent } from 'app/entities/guided-training/guided-training-update.component';
import { GuidedTrainingService } from 'app/entities/guided-training/guided-training.service';
import { GuidedTraining } from 'app/shared/model/guided-training.model';

describe('Component Tests', () => {
  describe('GuidedTraining Management Update Component', () => {
    let comp: GuidedTrainingUpdateComponent;
    let fixture: ComponentFixture<GuidedTrainingUpdateComponent>;
    let service: GuidedTrainingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [GuidedTrainingUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GuidedTrainingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GuidedTrainingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GuidedTrainingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GuidedTraining(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GuidedTraining();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
