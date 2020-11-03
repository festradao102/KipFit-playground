import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscriptionPayment } from 'app/shared/model/subscription-payment.model';

@Component({
  selector: 'jhi-subscription-payment-detail',
  templateUrl: './subscription-payment-detail.component.html',
})
export class SubscriptionPaymentDetailComponent implements OnInit {
  subscriptionPayment: ISubscriptionPayment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionPayment }) => (this.subscriptionPayment = subscriptionPayment));
  }

  previousState(): void {
    window.history.back();
  }
}
