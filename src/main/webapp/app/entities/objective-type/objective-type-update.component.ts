import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IObjectiveType, ObjectiveType } from 'app/shared/model/objective-type.model';
import { ObjectiveTypeService } from './objective-type.service';
import { IPlan } from 'app/shared/model/plan.model';
import { PlanService } from 'app/entities/plan/plan.service';

@Component({
  selector: 'jhi-objective-type-update',
  templateUrl: './objective-type-update.component.html',
})
export class ObjectiveTypeUpdateComponent implements OnInit {
  isSaving = false;
  plans: IPlan[] = [];

  editForm = this.fb.group({
    id: [],
    objectiveName: [],
    description: [],
    plan: [],
  });

  constructor(
    protected objectiveTypeService: ObjectiveTypeService,
    protected planService: PlanService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ objectiveType }) => {
      this.updateForm(objectiveType);

      this.planService.query().subscribe((res: HttpResponse<IPlan[]>) => (this.plans = res.body || []));
    });
  }

  updateForm(objectiveType: IObjectiveType): void {
    this.editForm.patchValue({
      id: objectiveType.id,
      objectiveName: objectiveType.objectiveName,
      description: objectiveType.description,
      plan: objectiveType.plan,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const objectiveType = this.createFromForm();
    if (objectiveType.id !== undefined) {
      this.subscribeToSaveResponse(this.objectiveTypeService.update(objectiveType));
    } else {
      this.subscribeToSaveResponse(this.objectiveTypeService.create(objectiveType));
    }
  }

  private createFromForm(): IObjectiveType {
    return {
      ...new ObjectiveType(),
      id: this.editForm.get(['id'])!.value,
      objectiveName: this.editForm.get(['objectiveName'])!.value,
      description: this.editForm.get(['description'])!.value,
      plan: this.editForm.get(['plan'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IObjectiveType>>): void {
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
