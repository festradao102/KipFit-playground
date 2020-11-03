import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRoutine } from 'app/shared/model/routine.model';

@Component({
  selector: 'jhi-routine-detail',
  templateUrl: './routine-detail.component.html',
})
export class RoutineDetailComponent implements OnInit {
  routine: IRoutine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ routine }) => (this.routine = routine));
  }

  previousState(): void {
    window.history.back();
  }
}
