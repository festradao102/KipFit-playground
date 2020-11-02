import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPlan, Plan } from 'app/shared/model/plan.model';
import { PlanService } from './plan.service';
import { ISubscriber } from 'app/shared/model/subscriber.model';
import { SubscriberService } from 'app/entities/subscriber/subscriber.service';

@Component({
  selector: 'jhi-plan-update',
  templateUrl: './plan-update.component.html',
})
export class PlanUpdateComponent implements OnInit {
  isSaving = false;
  subscribers: ISubscriber[] = [];

  editForm = this.fb.group({
    id: [],
    objective: [],
    dateCreated: [],
    creatorName: [],
    active: [],
    subscriber: [],
  });

  constructor(
    protected planService: PlanService,
    protected subscriberService: SubscriberService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plan }) => {
      if (!plan.id) {
        const today = moment().startOf('day');
        plan.dateCreated = today;
      }

      this.updateForm(plan);

      this.subscriberService.query().subscribe((res: HttpResponse<ISubscriber[]>) => (this.subscribers = res.body || []));
    });
  }

  updateForm(plan: IPlan): void {
    this.editForm.patchValue({
      id: plan.id,
      objective: plan.objective,
      dateCreated: plan.dateCreated ? plan.dateCreated.format(DATE_TIME_FORMAT) : null,
      creatorName: plan.creatorName,
      active: plan.active,
      subscriber: plan.subscriber,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const plan = this.createFromForm();
    if (plan.id !== undefined) {
      this.subscribeToSaveResponse(this.planService.update(plan));
    } else {
      this.subscribeToSaveResponse(this.planService.create(plan));
    }
  }

  private createFromForm(): IPlan {
    return {
      ...new Plan(),
      id: this.editForm.get(['id'])!.value,
      objective: this.editForm.get(['objective'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value
        ? moment(this.editForm.get(['dateCreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      creatorName: this.editForm.get(['creatorName'])!.value,
      active: this.editForm.get(['active'])!.value,
      subscriber: this.editForm.get(['subscriber'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlan>>): void {
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
