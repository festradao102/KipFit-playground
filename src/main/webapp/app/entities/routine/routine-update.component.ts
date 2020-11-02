import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRoutine, Routine } from 'app/shared/model/routine.model';
import { RoutineService } from './routine.service';
import { IPlan } from 'app/shared/model/plan.model';
import { PlanService } from 'app/entities/plan/plan.service';

@Component({
  selector: 'jhi-routine-update',
  templateUrl: './routine-update.component.html',
})
export class RoutineUpdateComponent implements OnInit {
  isSaving = false;
  plans: IPlan[] = [];

  editForm = this.fb.group({
    id: [],
    type: [],
    name: [],
    freq: [],
    plan: [],
  });

  constructor(
    protected routineService: RoutineService,
    protected planService: PlanService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ routine }) => {
      this.updateForm(routine);

      this.planService.query().subscribe((res: HttpResponse<IPlan[]>) => (this.plans = res.body || []));
    });
  }

  updateForm(routine: IRoutine): void {
    this.editForm.patchValue({
      id: routine.id,
      type: routine.type,
      name: routine.name,
      freq: routine.freq,
      plan: routine.plan,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const routine = this.createFromForm();
    if (routine.id !== undefined) {
      this.subscribeToSaveResponse(this.routineService.update(routine));
    } else {
      this.subscribeToSaveResponse(this.routineService.create(routine));
    }
  }

  private createFromForm(): IRoutine {
    return {
      ...new Routine(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      name: this.editForm.get(['name'])!.value,
      freq: this.editForm.get(['freq'])!.value,
      plan: this.editForm.get(['plan'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoutine>>): void {
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

  trackById(index: number, item: IPlan): any {
    return item.id;
  }
}
