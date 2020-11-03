import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExercisesSet } from 'app/shared/model/exercises-set.model';

@Component({
  selector: 'jhi-exercises-set-detail',
  templateUrl: './exercises-set-detail.component.html',
})
export class ExercisesSetDetailComponent implements OnInit {
  exercisesSet: IExercisesSet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exercisesSet }) => (this.exercisesSet = exercisesSet));
  }

  previousState(): void {
    window.history.back();
  }
}
