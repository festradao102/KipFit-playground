import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { ExercisesSetTypeUpdateComponent } from 'app/entities/exercises-set-type/exercises-set-type-update.component';
import { ExercisesSetTypeService } from 'app/entities/exercises-set-type/exercises-set-type.service';
import { ExercisesSetType } from 'app/shared/model/exercises-set-type.model';

describe('Component Tests', () => {
  describe('ExercisesSetType Management Update Component', () => {
    let comp: ExercisesSetTypeUpdateComponent;
    let fixture: ComponentFixture<ExercisesSetTypeUpdateComponent>;
    let service: ExercisesSetTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ExercisesSetTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ExercisesSetTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExercisesSetTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExercisesSetTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExercisesSetType(123);
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
        const entity = new ExercisesSetType();
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
