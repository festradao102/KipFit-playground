import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from './exercise.service';
import { ExerciseDeleteDialogComponent } from './exercise-delete-dialog.component';

@Component({
  selector: 'jhi-exercise',
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent implements OnInit, OnDestroy {
  exercises?: IExercise[];
  eventSubscriber?: Subscription;

  constructor(protected exerciseService: ExerciseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.exerciseService.query().subscribe((res: HttpResponse<IExercise[]>) => (this.exercises = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExercises();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExercise): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExercises(): void {
    this.eventSubscriber = this.eventManager.subscribe('exerciseListModification', () => this.loadAll());
  }

  delete(exercise: IExercise): void {
    const modalRef = this.modalService.open(ExerciseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exercise = exercise;
  }
}
