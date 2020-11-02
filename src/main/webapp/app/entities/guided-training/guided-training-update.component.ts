import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IGuidedTraining, GuidedTraining } from 'app/shared/model/guided-training.model';
import { GuidedTrainingService } from './guided-training.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule/schedule.service';

@Component({
  selector: 'jhi-guided-training-update',
  templateUrl: './guided-training-update.component.html',
})
export class GuidedTrainingUpdateComponent implements OnInit {
  isSaving = false;
  schedules: ISchedule[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    trainerName: [],
    capacity: [],
    date: [],
    activeState: [],
    schedules: [],
  });

  constructor(
    protected guidedTrainingService: GuidedTrainingService,
    protected scheduleService: ScheduleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ guidedTraining }) => {
      if (!guidedTraining.id) {
        const today = moment().startOf('day');
        guidedTraining.date = today;
      }

      this.updateForm(guidedTraining);

      this.scheduleService.query().subscribe((res: HttpResponse<ISchedule[]>) => (this.schedules = res.body || []));
    });
  }

  updateForm(guidedTraining: IGuidedTraining): void {
    this.editForm.patchValue({
      id: guidedTraining.id,
      name: guidedTraining.name,
      trainerName: guidedTraining.trainerName,
      capacity: guidedTraining.capacity,
      date: guidedTraining.date ? guidedTraining.date.format(DATE_TIME_FORMAT) : null,
      activeState: guidedTraining.activeState,
      schedules: guidedTraining.schedules,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const guidedTraining = this.createFromForm();
    if (guidedTraining.id !== undefined) {
      this.subscribeToSaveResponse(this.guidedTrainingService.update(guidedTraining));
    } else {
      this.subscribeToSaveResponse(this.guidedTrainingService.create(guidedTraining));
    }
  }

  private createFromForm(): IGuidedTraining {
    return {
      ...new GuidedTraining(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      trainerName: this.editForm.get(['trainerName'])!.value,
      capacity: this.editForm.get(['capacity'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      activeState: this.editForm.get(['activeState'])!.value,
      schedules: this.editForm.get(['schedules'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGuidedTraining>>): void {
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

  trackById(index: number, item: ISchedule): any {
    return item.id;
  }

  getSelected(selectedVals: ISchedule[], option: ISchedule): ISchedule {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
