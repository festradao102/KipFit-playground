import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISystemParameter } from 'app/shared/model/system-parameter.model';
import { SystemParameterService } from './system-parameter.service';
import { SystemParameterDeleteDialogComponent } from './system-parameter-delete-dialog.component';

@Component({
  selector: 'jhi-system-parameter',
  templateUrl: './system-parameter.component.html',
})
export class SystemParameterComponent implements OnInit, OnDestroy {
  systemParameters?: ISystemParameter[];
  eventSubscriber?: Subscription;

  constructor(
    protected systemParameterService: SystemParameterService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.systemParameterService.query().subscribe((res: HttpResponse<ISystemParameter[]>) => (this.systemParameters = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSystemParameters();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISystemParameter): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSystemParameters(): void {
    this.eventSubscriber = this.eventManager.subscribe('systemParameterListModification', () => this.loadAll());
  }

  delete(systemParameter: ISystemParameter): void {
    const modalRef = this.modalService.open(SystemParameterDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.systemParameter = systemParameter;
  }
}
