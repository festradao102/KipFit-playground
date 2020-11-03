import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { ObjectiveTypeUpdateComponent } from 'app/entities/objective-type/objective-type-update.component';
import { ObjectiveTypeService } from 'app/entities/objective-type/objective-type.service';
import { ObjectiveType } from 'app/shared/model/objective-type.model';

describe('Component Tests', () => {
  describe('ObjectiveType Management Update Component', () => {
    let comp: ObjectiveTypeUpdateComponent;
    let fixture: ComponentFixture<ObjectiveTypeUpdateComponent>;
    let service: ObjectiveTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ObjectiveTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ObjectiveTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObjectiveTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObjectiveTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ObjectiveType(123);
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
        const entity = new ObjectiveType();
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
