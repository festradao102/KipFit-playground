import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeasurement } from 'app/shared/model/measurement.model';
import { MeasurementService } from './measurement.service';

@Component({
  templateUrl: './measurement-delete-dialog.component.html',
})
export class MeasurementDeleteDialogComponent {
  measurement?: IMeasurement;

  constructor(
    protected measurementService: MeasurementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.measurementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('measurementListModification');
      this.activeModal.close();
    });
  }
}
