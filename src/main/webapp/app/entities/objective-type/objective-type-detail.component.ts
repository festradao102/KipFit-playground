import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IObjectiveType } from 'app/shared/model/objective-type.model';

@Component({
  selector: 'jhi-objective-type-detail',
  templateUrl: './objective-type-detail.component.html',
})
export class ObjectiveTypeDetailComponent implements OnInit {
  objectiveType: IObjectiveType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ objectiveType }) => (this.objectiveType = objectiveType));
  }

  previousState(): void {
    window.history.back();
  }
}
