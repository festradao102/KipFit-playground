import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExerciseType } from 'app/shared/model/exercise-type.model';
import { ExerciseTypeService } from './exercise-type.service';
import { ExerciseTypeDeleteDialogComponent } from './exercise-type-delete-dialog.component';

@Component({
  selector: 'jhi-exercise-type',
  templateUrl: './exercise-type.component.html',
})
export class ExerciseTypeComponent implements OnInit, OnDestroy {
  exerciseTypes?: IExerciseType[];
  eventSubscriber?: Subscription;

  constructor(
    protected exerciseTypeService: ExerciseTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.exerciseTypeService.query().subscribe((res: HttpResponse<IExerciseType[]>) => (this.exerciseTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExerciseTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExerciseType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExerciseTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('exerciseTypeListModification', () => this.loadAll());
  }

  delete(exerciseType: IExerciseType): void {
    const modalRef = this.modalService.open(ExerciseTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exerciseType = exerciseType;
  }
}
