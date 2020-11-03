import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRoutine } from 'app/shared/model/routine.model';
import { RoutineService } from './routine.service';

@Component({
  templateUrl: './routine-delete-dialog.component.html',
})
export class RoutineDeleteDialogComponent {
  routine?: IRoutine;

  constructor(protected routineService: RoutineService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.routineService.delete(id).subscribe(() => {
      this.eventManager.broadcast('routineListModification');
      this.activeModal.close();
    });
  }
}
