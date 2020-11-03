import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { ExercisesSetUpdateComponent } from 'app/entities/exercises-set/exercises-set-update.component';
import { ExercisesSetService } from 'app/entities/exercises-set/exercises-set.service';
import { ExercisesSet } from 'app/shared/model/exercises-set.model';

describe('Component Tests', () => {
  describe('ExercisesSet Management Update Component', () => {
    let comp: ExercisesSetUpdateComponent;
    let fixture: ComponentFixture<ExercisesSetUpdateComponent>;
    let service: ExercisesSetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExercisesSetUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ExercisesSetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExercisesSetUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExercisesSetService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExercisesSet(123);
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
        const entity = new ExercisesSet();
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
