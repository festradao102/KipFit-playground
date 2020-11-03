import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeasurement } from 'app/shared/model/measurement.model';

@Component({
  selector: 'jhi-measurement-detail',
  templateUrl: './measurement-detail.component.html',
})
export class MeasurementDetailComponent implements OnInit {
  measurement: IMeasurement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ measurement }) => (this.measurement = measurement));
  }

  previousState(): void {
    window.history.back();
  }
}
