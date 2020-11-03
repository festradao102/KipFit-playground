import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFitUser } from 'app/shared/model/fit-user.model';
import { FitUserService } from './fit-user.service';

@Component({
  templateUrl: './fit-user-delete-dialog.component.html',
})
export class FitUserDeleteDialogComponent {
  fitUser?: IFitUser;

  constructor(protected fitUserService: FitUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fitUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fitUserListModification');
      this.activeModal.close();
    });
  }
}
