import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { SystemParameterUpdateComponent } from 'app/entities/system-parameter/system-parameter-update.component';
import { SystemParameterService } from 'app/entities/system-parameter/system-parameter.service';
import { SystemParameter } from 'app/shared/model/system-parameter.model';

describe('Component Tests', () => {
  describe('SystemParameter Management Update Component', () => {
    let comp: SystemParameterUpdateComponent;
    let fixture: ComponentFixture<SystemParameterUpdateComponent>;
    let service: SystemParameterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [SystemParameterUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SystemParameterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SystemParameterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SystemParameterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SystemParameter(123);
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
        const entity = new SystemParameter();
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
