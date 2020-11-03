import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IObjectiveType } from 'app/shared/model/objective-type.model';
import { ObjectiveTypeService } from './objective-type.service';

@Component({
  templateUrl: './objective-type-delete-dialog.component.html',
})
export class ObjectiveTypeDeleteDialogComponent {
  objectiveType?: IObjectiveType;

  constructor(
    protected objectiveTypeService: ObjectiveTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.objectiveTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('objectiveTypeListModification');
      this.activeModal.close();
    });
  }
}
