import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExercisesSet } from 'app/shared/model/exercises-set.model';
import { ExercisesSetService } from './exercises-set.service';
import { ExercisesSetDeleteDialogComponent } from './exercises-set-delete-dialog.component';

@Component({
  selector: 'jhi-exercises-set',
  templateUrl: './exercises-set.component.html',
})
export class ExercisesSetComponent implements OnInit, OnDestroy {
  exercisesSets?: IExercisesSet[];
  eventSubscriber?: Subscription;

  constructor(
    protected exercisesSetService: ExercisesSetService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.exercisesSetService.query().subscribe((res: HttpResponse<IExercisesSet[]>) => (this.exercisesSets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExercisesSets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExercisesSet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExercisesSets(): void {
    this.eventSubscriber = this.eventManager.subscribe('exercisesSetListModification', () => this.loadAll());
  }

  delete(exercisesSet: IExercisesSet): void {
    const modalRef = this.modalService.open(ExercisesSetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exercisesSet = exercisesSet;
  }
}
