import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExercisesSet } from 'app/shared/model/exercises-set.model';
import { ExercisesSetService } from './exercises-set.service';

@Component({
  templateUrl: './exercises-set-delete-dialog.component.html',
})
export class ExercisesSetDeleteDialogComponent {
  exercisesSet?: IExercisesSet;

  constructor(
    protected exercisesSetService: ExercisesSetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.exercisesSetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('exercisesSetListModification');
      this.activeModal.close();
    });
  }
}
