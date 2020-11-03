import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KipfitTestModule } from '../../../test.module';
import { SubscriptionPaymentComponent } from 'app/entities/subscription-payment/subscription-payment.component';
import { SubscriptionPaymentService } from 'app/entities/subscription-payment/subscription-payment.service';
import { SubscriptionPayment } from 'app/shared/model/subscription-payment.model';

describe('Component Tests', () => {
  describe('SubscriptionPayment Management Component', () => {
    let comp: SubscriptionPaymentComponent;
    let fixture: ComponentFixture<SubscriptionPaymentComponent>;
    let service: SubscriptionPaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [SubscriptionPaymentComponent],
      })
        .overrideTemplate(SubscriptionPaymentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionPaymentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionPaymentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SubscriptionPayment(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subscriptionPayments && comp.subscriptionPayments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
