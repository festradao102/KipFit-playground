import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMeasurement, Measurement } from 'app/shared/model/measurement.model';
import { MeasurementService } from './measurement.service';
import { ISubscriber } from 'app/shared/model/subscriber.model';
import { SubscriberService } from 'app/entities/subscriber/subscriber.service';

@Component({
  selector: 'jhi-measurement-update',
  templateUrl: './measurement-update.component.html',
})
export class MeasurementUpdateComponent implements OnInit {
  isSaving = false;
  subscribers: ISubscriber[] = [];

  editForm = this.fb.group({
    id: [],
    measurementId: [],
    metabolicage: [],
    bmr: [],
    boneMass: [],
    height: [],
    weight: [],
    fatPercentage: [],
    neck: [],
    rightArm: [],
    leftArm: [],
    wrist: [],
    core: [],
    hip: [],
    thorax: [],
    rightThigh: [],
    leftThigh: [],
    rightCalve: [],
    leftCalve: [],
    dateCreated: [],
    subscriber: [],
  });

  constructor(
    protected measurementService: MeasurementService,
    protected subscriberService: SubscriberService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ measurement }) => {
      if (!measurement.id) {
        const today = moment().startOf('day');
        measurement.dateCreated = today;
      }

      this.updateForm(measurement);

      this.subscriberService.query().subscribe((res: HttpResponse<ISubscriber[]>) => (this.subscribers = res.body || []));
    });
  }

  updateForm(measurement: IMeasurement): void {
    this.editForm.patchValue({
      id: measurement.id,
      measurementId: measurement.measurementId,
      metabolicage: measurement.metabolicage,
      bmr: measurement.bmr,
      boneMass: measurement.boneMass,
      height: measurement.height,
      weight: measurement.weight,
      fatPercentage: measurement.fatPercentage,
      neck: measurement.neck,
      rightArm: measurement.rightArm,
      leftArm: measurement.leftArm,
      wrist: measurement.wrist,
      core: measurement.core,
      hip: measurement.hip,
      thorax: measurement.thorax,
      rightThigh: measurement.rightThigh,
      leftThigh: measurement.leftThigh,
      rightCalve: measurement.rightCalve,
      leftCalve: measurement.leftCalve,
      dateCreated: measurement.dateCreated ? measurement.dateCreated.format(DATE_TIME_FORMAT) : null,
      subscriber: measurement.subscriber,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const measurement = this.createFromForm();
    if (measurement.id !== undefined) {
      this.subscribeToSaveResponse(this.measurementService.update(measurement));
    } else {
      this.subscribeToSaveResponse(this.measurementService.create(measurement));
    }
  }

  private createFromForm(): IMeasurement {
    return {
      ...new Measurement(),
      id: this.editForm.get(['id'])!.value,
      measurementId: this.editForm.get(['measurementId'])!.value,
      metabolicage: this.editForm.get(['metabolicage'])!.value,
      bmr: this.editForm.get(['bmr'])!.value,
      boneMass: this.editForm.get(['boneMass'])!.value,
      height: this.editForm.get(['height'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      fatPercentage: this.editForm.get(['fatPercentage'])!.value,
      neck: this.editForm.get(['neck'])!.value,
      rightArm: this.editForm.get(['rightArm'])!.value,
      leftArm: this.editForm.get(['leftArm'])!.value,
      wrist: this.editForm.get(['wrist'])!.value,
      core: this.editForm.get(['core'])!.value,
      hip: this.editForm.get(['hip'])!.value,
      thorax: this.editForm.get(['thorax'])!.value,
      rightThigh: this.editForm.get(['rightThigh'])!.value,
      leftThigh: this.editForm.get(['leftThigh'])!.value,
      rightCalve: this.editForm.get(['rightCalve'])!.value,
      leftCalve: this.editForm.get(['leftCalve'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value
        ? moment(this.editForm.get(['dateCreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      subscriber: this.editForm.get(['subscriber'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeasurement>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISubscriber): any {
    return item.id;
  }
}
