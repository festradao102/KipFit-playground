import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExercisesSetType } from 'app/shared/model/exercises-set-type.model';

@Component({
  selector: 'jhi-exercises-set-type-detail',
  templateUrl: './exercises-set-type-detail.component.html',
})
export class ExercisesSetTypeDetailComponent implements OnInit {
  exercisesSetType: IExercisesSetType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exercisesSetType }) => (this.exercisesSetType = exercisesSetType));
  }

  previousState(): void {
    window.history.back();
  }
}
