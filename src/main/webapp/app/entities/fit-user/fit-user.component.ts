import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFitUser } from 'app/shared/model/fit-user.model';
import { FitUserService } from './fit-user.service';
import { FitUserDeleteDialogComponent } from './fit-user-delete-dialog.component';

@Component({
  selector: 'jhi-fit-user',
  templateUrl: './fit-user.component.html',
})
export class FitUserComponent implements OnInit, OnDestroy {
  fitUsers?: IFitUser[];
  eventSubscriber?: Subscription;

  constructor(protected fitUserService: FitUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.fitUserService.query().subscribe((res: HttpResponse<IFitUser[]>) => (this.fitUsers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFitUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFitUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFitUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('fitUserListModification', () => this.loadAll());
  }

  delete(fitUser: IFitUser): void {
    const modalRef = this.modalService.open(FitUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fitUser = fitUser;
  }
}
