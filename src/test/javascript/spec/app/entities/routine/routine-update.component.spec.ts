import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { RoutineUpdateComponent } from 'app/entities/routine/routine-update.component';
import { RoutineService } from 'app/entities/routine/routine.service';
import { Routine } from 'app/shared/model/routine.model';

describe('Component Tests', () => {
  describe('Routine Management Update Component', () => {
    let comp: RoutineUpdateComponent;
    let fixture: ComponentFixture<RoutineUpdateComponent>;
    let service: RoutineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [RoutineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RoutineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RoutineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RoutineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Routine(123);
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
        const entity = new Routine();
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
