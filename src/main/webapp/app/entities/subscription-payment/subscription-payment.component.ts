import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscriptionPayment } from 'app/shared/model/subscription-payment.model';
import { SubscriptionPaymentService } from './subscription-payment.service';
import { SubscriptionPaymentDeleteDialogComponent } from './subscription-payment-delete-dialog.component';

@Component({
  selector: 'jhi-subscription-payment',
  templateUrl: './subscription-payment.component.html',
})
export class SubscriptionPaymentComponent implements OnInit, OnDestroy {
  subscriptionPayments?: ISubscriptionPayment[];
  eventSubscriber?: Subscription;

  constructor(
    protected subscriptionPaymentService: SubscriptionPaymentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.subscriptionPaymentService
      .query()
      .subscribe((res: HttpResponse<ISubscriptionPayment[]>) => (this.subscriptionPayments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubscriptionPayments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubscriptionPayment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubscriptionPayments(): void {
    this.eventSubscriber = this.eventManager.subscribe('subscriptionPaymentListModification', () => this.loadAll());
  }

  delete(subscriptionPayment: ISubscriptionPayment): void {
    const modalRef = this.modalService.open(SubscriptionPaymentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subscriptionPayment = subscriptionPayment;
  }
}
