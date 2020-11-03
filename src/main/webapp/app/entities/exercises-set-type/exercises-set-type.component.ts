import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExercisesSetType } from 'app/shared/model/exercises-set-type.model';
import { ExercisesSetTypeService } from './exercises-set-type.service';
import { ExercisesSetTypeDeleteDialogComponent } from './exercises-set-type-delete-dialog.component';

@Component({
  selector: 'jhi-exercises-set-type',
  templateUrl: './exercises-set-type.component.html',
})
export class ExercisesSetTypeComponent implements OnInit, OnDestroy {
  exercisesSetTypes?: IExercisesSetType[];
  eventSubscriber?: Subscription;

  constructor(
    protected exercisesSetTypeService: ExercisesSetTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.exercisesSetTypeService.query().subscribe((res: HttpResponse<IExercisesSetType[]>) => (this.exercisesSetTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExercisesSetTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExercisesSetType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExercisesSetTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('exercisesSetTypeListModification', () => this.loadAll());
  }

  delete(exercisesSetType: IExercisesSetType): void {
    const modalRef = this.modalService.open(ExercisesSetTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exercisesSetType = exercisesSetType;
  }
}
