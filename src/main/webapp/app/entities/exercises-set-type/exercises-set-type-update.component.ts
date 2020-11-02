import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExercisesSetType, ExercisesSetType } from 'app/shared/model/exercises-set-type.model';
import { ExercisesSetTypeService } from './exercises-set-type.service';
import { IExercisesSet } from 'app/shared/model/exercises-set.model';
import { ExercisesSetService } from 'app/entities/exercises-set/exercises-set.service';

@Component({
  selector: 'jhi-exercises-set-type-update',
  templateUrl: './exercises-set-type-update.component.html',
})
export class ExercisesSetTypeUpdateComponent implements OnInit {
  isSaving = false;
  exercisessets: IExercisesSet[] = [];

  editForm = this.fb.group({
    id: [],
    typeName: [],
    exercisesSet: [],
  });

  constructor(
    protected exercisesSetTypeService: ExercisesSetTypeService,
    protected exercisesSetService: ExercisesSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exercisesSetType }) => {
      this.updateForm(exercisesSetType);

      this.exercisesSetService.query().subscribe((res: HttpResponse<IExercisesSet[]>) => (this.exercisessets = res.body || []));
    });
  }

  updateForm(exercisesSetType: IExercisesSetType): void {
    this.editForm.patchValue({
      id: exercisesSetType.id,
      typeName: exercisesSetType.typeName,
      exercisesSet: exercisesSetType.exercisesSet,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exercisesSetType = this.createFromForm();
    if (exercisesSetType.id !== undefined) {
      this.subscribeToSaveResponse(this.exercisesSetTypeService.update(exercisesSetType));
    } else {
      this.subscribeToSaveResponse(this.exercisesSetTypeService.create(exercisesSetType));
    }
  }

  private createFromForm(): IExercisesSetType {
    return {
      ...new ExercisesSetType(),
      id: this.editForm.get(['id'])!.value,
      typeName: this.editForm.get(['typeName'])!.value,
      exercisesSet: this.editForm.get(['exercisesSet'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExercisesSetType>>): void {
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

  trackById(index: number, item: IExercisesSet): any {
    return item.id;
  }
}
