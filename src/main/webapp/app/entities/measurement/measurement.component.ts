import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMeasurement } from 'app/shared/model/measurement.model';
import { MeasurementService } from './measurement.service';
import { MeasurementDeleteDialogComponent } from './measurement-delete-dialog.component';

@Component({
  selector: 'jhi-measurement',
  templateUrl: './measurement.component.html',
})
export class MeasurementComponent implements OnInit, OnDestroy {
  measurements?: IMeasurement[];
  eventSubscriber?: Subscription;

  constructor(
    protected measurementService: MeasurementService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.measurementService.query().subscribe((res: HttpResponse<IMeasurement[]>) => (this.measurements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMeasurements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMeasurement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMeasurements(): void {
    this.eventSubscriber = this.eventManager.subscribe('measurementListModification', () => this.loadAll());
  }

  delete(measurement: IMeasurement): void {
    const modalRef = this.modalService.open(MeasurementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.measurement = measurement;
  }
}
