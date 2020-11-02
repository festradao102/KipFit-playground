import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExercisesSetType } from 'app/shared/model/exercises-set-type.model';
import { ExercisesSetTypeService } from './exercises-set-type.service';

@Component({
  templateUrl: './exercises-set-type-delete-dialog.component.html',
})
export class ExercisesSetTypeDeleteDialogComponent {
  exercisesSetType?: IExercisesSetType;

  constructor(
    protected exercisesSetTypeService: ExercisesSetTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.exercisesSetTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('exercisesSetTypeListModification');
      this.activeModal.close();
    });
  }
}
