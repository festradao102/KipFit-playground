import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGuidedTraining } from 'app/shared/model/guided-training.model';
import { GuidedTrainingService } from './guided-training.service';

@Component({
  templateUrl: './guided-training-delete-dialog.component.html',
})
export class GuidedTrainingDeleteDialogComponent {
  guidedTraining?: IGuidedTraining;

  constructor(
    protected guidedTrainingService: GuidedTrainingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.guidedTrainingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('guidedTrainingListModification');
      this.activeModal.close();
    });
  }
}
