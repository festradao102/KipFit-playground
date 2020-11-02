import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExerciseType } from 'app/shared/model/exercise-type.model';
import { ExerciseTypeService } from './exercise-type.service';

@Component({
  templateUrl: './exercise-type-delete-dialog.component.html',
})
export class ExerciseTypeDeleteDialogComponent {
  exerciseType?: IExerciseType;

  constructor(
    protected exerciseTypeService: ExerciseTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.exerciseTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('exerciseTypeListModification');
      this.activeModal.close();
    });
  }
}
