import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISystemParameter, SystemParameter } from 'app/shared/model/system-parameter.model';
import { SystemParameterService } from './system-parameter.service';

@Component({
  selector: 'jhi-system-parameter-update',
  templateUrl: './system-parameter-update.component.html',
})
export class SystemParameterUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    gymName: [],
    logoPath: [],
  });

  constructor(
    protected systemParameterService: SystemParameterService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ systemParameter }) => {
      this.updateForm(systemParameter);
    });
  }

  updateForm(systemParameter: ISystemParameter): void {
    this.editForm.patchValue({
      id: systemParameter.id,
      gymName: systemParameter.gymName,
      logoPath: systemParameter.logoPath,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const systemParameter = this.createFromForm();
    if (systemParameter.id !== undefined) {
      this.subscribeToSaveResponse(this.systemParameterService.update(systemParameter));
    } else {
      this.subscribeToSaveResponse(this.systemParameterService.create(systemParameter));
    }
  }

  private createFromForm(): ISystemParameter {
    return {
      ...new SystemParameter(),
      id: this.editForm.get(['id'])!.value,
      gymName: this.editForm.get(['gymName'])!.value,
      logoPath: this.editForm.get(['logoPath'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemParameter>>): void {
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
}
