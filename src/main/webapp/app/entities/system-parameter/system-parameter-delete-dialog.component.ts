import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemParameter } from 'app/shared/model/system-parameter.model';
import { SystemParameterService } from './system-parameter.service';

@Component({
  templateUrl: './system-parameter-delete-dialog.component.html',
})
export class SystemParameterDeleteDialogComponent {
  systemParameter?: ISystemParameter;

  constructor(
    protected systemParameterService: SystemParameterService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.systemParameterService.delete(id).subscribe(() => {
      this.eventManager.broadcast('systemParameterListModification');
      this.activeModal.close();
    });
  }
}
