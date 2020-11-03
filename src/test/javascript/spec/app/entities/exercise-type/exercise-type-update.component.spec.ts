import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { ExerciseTypeUpdateComponent } from 'app/entities/exercise-type/exercise-type-update.component';
import { ExerciseTypeService } from 'app/entities/exercise-type/exercise-type.service';
import { ExerciseType } from 'app/shared/model/exercise-type.model';

describe('Component Tests', () => {
  describe('ExerciseType Management Update Component', () => {
    let comp: ExerciseTypeUpdateComponent;
    let fixture: ComponentFixture<ExerciseTypeUpdateComponent>;
    let service: ExerciseTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExerciseTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ExerciseTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExerciseTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExerciseTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExerciseType(123);
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
        const entity = new ExerciseType();
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
