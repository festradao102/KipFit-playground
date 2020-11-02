import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGuidedTraining } from 'app/shared/model/guided-training.model';

@Component({
  selector: 'jhi-guided-training-detail',
  templateUrl: './guided-training-detail.component.html',
})
export class GuidedTrainingDetailComponent implements OnInit {
  guidedTraining: IGuidedTraining | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ guidedTraining }) => (this.guidedTraining = guidedTraining));
  }

  previousState(): void {
    window.history.back();
  }
}
