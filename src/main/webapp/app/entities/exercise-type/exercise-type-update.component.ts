import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExerciseType, ExerciseType } from 'app/shared/model/exercise-type.model';
import { ExerciseTypeService } from './exercise-type.service';
import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from 'app/entities/exercise/exercise.service';

@Component({
  selector: 'jhi-exercise-type-update',
  templateUrl: './exercise-type-update.component.html',
})
export class ExerciseTypeUpdateComponent implements OnInit {
  isSaving = false;
  exercises: IExercise[] = [];

  editForm = this.fb.group({
    id: [],
    typeName: [],
    exercise: [],
  });

  constructor(
    protected exerciseTypeService: ExerciseTypeService,
    protected exerciseService: ExerciseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exerciseType }) => {
      this.updateForm(exerciseType);

      this.exerciseService.query().subscribe((res: HttpResponse<IExercise[]>) => (this.exercises = res.body || []));
    });
  }

  updateForm(exerciseType: IExerciseType): void {
    this.editForm.patchValue({
      id: exerciseType.id,
      typeName: exerciseType.typeName,
      exercise: exerciseType.exercise,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exerciseType = this.createFromForm();
    if (exerciseType.id !== undefined) {
      this.subscribeToSaveResponse(this.exerciseTypeService.update(exerciseType));
    } else {
      this.subscribeToSaveResponse(this.exerciseTypeService.create(exerciseType));
    }
  }

  private createFromForm(): IExerciseType {
    return {
      ...new ExerciseType(),
      id: this.editForm.get(['id'])!.value,
      typeName: this.editForm.get(['typeName'])!.value,
      exercise: this.editForm.get(['exercise'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExerciseType>>): void {
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

  trackById(index: number, item: IExercise): any {
    return item.id;
  }
}
