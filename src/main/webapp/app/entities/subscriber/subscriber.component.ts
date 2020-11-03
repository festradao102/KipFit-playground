import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscriber } from 'app/shared/model/subscriber.model';
import { SubscriberService } from './subscriber.service';
import { SubscriberDeleteDialogComponent } from './subscriber-delete-dialog.component';

@Component({
  selector: 'jhi-subscriber',
  templateUrl: './subscriber.component.html',
})
export class SubscriberComponent implements OnInit, OnDestroy {
  subscribers?: ISubscriber[];
  eventSubscriber?: Subscription;

  constructor(protected subscriberService: SubscriberService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.subscriberService.query().subscribe((res: HttpResponse<ISubscriber[]>) => (this.subscribers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubscribers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubscriber): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubscribers(): void {
    this.eventSubscriber = this.eventManager.subscribe('subscriberListModification', () => this.loadAll());
  }

  delete(subscriber: ISubscriber): void {
    const modalRef = this.modalService.open(SubscriberDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subscriber = subscriber;
  }
}
