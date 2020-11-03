import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { FitUserUpdateComponent } from 'app/entities/fit-user/fit-user-update.component';
import { FitUserService } from 'app/entities/fit-user/fit-user.service';
import { FitUser } from 'app/shared/model/fit-user.model';

describe('Component Tests', () => {
  describe('FitUser Management Update Component', () => {
    let comp: FitUserUpdateComponent;
    let fixture: ComponentFixture<FitUserUpdateComponent>;
    let service: FitUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [FitUserUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FitUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FitUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FitUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FitUser(123);
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
        const entity = new FitUser();
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
