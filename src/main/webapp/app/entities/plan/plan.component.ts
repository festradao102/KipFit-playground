import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlan } from 'app/shared/model/plan.model';
import { PlanService } from './plan.service';
import { PlanDeleteDialogComponent } from './plan-delete-dialog.component';

@Component({
  selector: 'jhi-plan',
  templateUrl: './plan.component.html',
})
export class PlanComponent implements OnInit, OnDestroy {
  plans?: IPlan[];
  eventSubscriber?: Subscription;

  constructor(protected planService: PlanService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.planService.query().subscribe((res: HttpResponse<IPlan[]>) => (this.plans = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPlans();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPlan): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPlans(): void {
    this.eventSubscriber = this.eventManager.subscribe('planListModification', () => this.loadAll());
  }

  delete(plan: IPlan): void {
    const modalRef = this.modalService.open(PlanDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.plan = plan;
  }
}
