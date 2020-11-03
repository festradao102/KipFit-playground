import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { SubscriptionPaymentUpdateComponent } from 'app/entities/subscription-payment/subscription-payment-update.component';
import { SubscriptionPaymentService } from 'app/entities/subscription-payment/subscription-payment.service';
import { SubscriptionPayment } from 'app/shared/model/subscription-payment.model';

describe('Component Tests', () => {
  describe('SubscriptionPayment Management Update Component', () => {
    let comp: SubscriptionPaymentUpdateComponent;
    let fixture: ComponentFixture<SubscriptionPaymentUpdateComponent>;
    let service: SubscriptionPaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [SubscriptionPaymentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SubscriptionPaymentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionPaymentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionPaymentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubscriptionPayment(123);
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
        const entity = new SubscriptionPayment();
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
