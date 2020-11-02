import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IObjectiveType } from 'app/shared/model/objective-type.model';
import { ObjectiveTypeService } from './objective-type.service';
import { ObjectiveTypeDeleteDialogComponent } from './objective-type-delete-dialog.component';

@Component({
  selector: 'jhi-objective-type',
  templateUrl: './objective-type.component.html',
})
export class ObjectiveTypeComponent implements OnInit, OnDestroy {
  objectiveTypes?: IObjectiveType[];
  eventSubscriber?: Subscription;

  constructor(
    protected objectiveTypeService: ObjectiveTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.objectiveTypeService.query().subscribe((res: HttpResponse<IObjectiveType[]>) => (this.objectiveTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInObjectiveTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IObjectiveType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInObjectiveTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('objectiveTypeListModification', () => this.loadAll());
  }

  delete(objectiveType: IObjectiveType): void {
    const modalRef = this.modalService.open(ObjectiveTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.objectiveType = objectiveType;
  }
}
