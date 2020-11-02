import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscriptionPayment } from 'app/shared/model/subscription-payment.model';
import { SubscriptionPaymentService } from './subscription-payment.service';

@Component({
  templateUrl: './subscription-payment-delete-dialog.component.html',
})
export class SubscriptionPaymentDeleteDialogComponent {
  subscriptionPayment?: ISubscriptionPayment;

  constructor(
    protected subscriptionPaymentService: SubscriptionPaymentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subscriptionPaymentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subscriptionPaymentListModification');
      this.activeModal.close();
    });
  }
}
