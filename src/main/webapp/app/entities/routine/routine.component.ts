import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRoutine } from 'app/shared/model/routine.model';
import { RoutineService } from './routine.service';
import { RoutineDeleteDialogComponent } from './routine-delete-dialog.component';

@Component({
  selector: 'jhi-routine',
  templateUrl: './routine.component.html',
})
export class RoutineComponent implements OnInit, OnDestroy {
  routines?: IRoutine[];
  eventSubscriber?: Subscription;

  constructor(protected routineService: RoutineService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.routineService.query().subscribe((res: HttpResponse<IRoutine[]>) => (this.routines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRoutines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRoutine): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRoutines(): void {
    this.eventSubscriber = this.eventManager.subscribe('routineListModification', () => this.loadAll());
  }

  delete(routine: IRoutine): void {
    const modalRef = this.modalService.open(RoutineDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.routine = routine;
  }
}
