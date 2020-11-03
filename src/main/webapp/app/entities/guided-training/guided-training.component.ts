import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGuidedTraining } from 'app/shared/model/guided-training.model';
import { GuidedTrainingService } from './guided-training.service';
import { GuidedTrainingDeleteDialogComponent } from './guided-training-delete-dialog.component';

@Component({
  selector: 'jhi-guided-training',
  templateUrl: './guided-training.component.html',
})
export class GuidedTrainingComponent implements OnInit, OnDestroy {
  guidedTrainings?: IGuidedTraining[];
  eventSubscriber?: Subscription;

  constructor(
    protected guidedTrainingService: GuidedTrainingService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.guidedTrainingService.query().subscribe((res: HttpResponse<IGuidedTraining[]>) => (this.guidedTrainings = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGuidedTrainings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGuidedTraining): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGuidedTrainings(): void {
    this.eventSubscriber = this.eventManager.subscribe('guidedTrainingListModification', () => this.loadAll());
  }

  delete(guidedTraining: IGuidedTraining): void {
    const modalRef = this.modalService.open(GuidedTrainingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.guidedTraining = guidedTraining;
  }
}
