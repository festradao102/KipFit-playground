import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { SubscriptionPaymentDetailComponent } from 'app/entities/subscription-payment/subscription-payment-detail.component';
import { SubscriptionPayment } from 'app/shared/model/subscription-payment.model';

describe('Component Tests', () => {
  describe('SubscriptionPayment Management Detail Component', () => {
    let comp: SubscriptionPaymentDetailComponent;
    let fixture: ComponentFixture<SubscriptionPaymentDetailComponent>;
    const route = ({ data: of({ subscriptionPayment: new SubscriptionPayment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [SubscriptionPaymentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SubscriptionPaymentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptionPaymentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subscriptionPayment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subscriptionPayment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
