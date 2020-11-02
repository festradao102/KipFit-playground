import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscriber } from 'app/shared/model/subscriber.model';
import { SubscriberService } from './subscriber.service';

@Component({
  templateUrl: './subscriber-delete-dialog.component.html',
})
export class SubscriberDeleteDialogComponent {
  subscriber?: ISubscriber;

  constructor(
    protected subscriberService: SubscriberService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subscriberService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subscriberListModification');
      this.activeModal.close();
    });
  }
}
