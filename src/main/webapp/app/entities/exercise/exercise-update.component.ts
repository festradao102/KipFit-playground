import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExercise, Exercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'jhi-exercise-update',
  templateUrl: './exercise-update.component.html',
})
export class ExerciseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    position: [],
    instructions: [],
    videoPath: [],
  });

  constructor(protected exerciseService: ExerciseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exercise }) => {
      this.updateForm(exercise);
    });
  }

  updateForm(exercise: IExercise): void {
    this.editForm.patchValue({
      id: exercise.id,
      name: exercise.name,
      position: exercise.position,
      instructions: exercise.instructions,
      videoPath: exercise.videoPath,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exercise = this.createFromForm();
    if (exercise.id !== undefined) {
      this.subscribeToSaveResponse(this.exerciseService.update(exercise));
    } else {
      this.subscribeToSaveResponse(this.exerciseService.create(exercise));
    }
  }

  private createFromForm(): IExercise {
    return {
      ...new Exercise(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      position: this.editForm.get(['position'])!.value,
      instructions: this.editForm.get(['instructions'])!.value,
      videoPath: this.editForm.get(['videoPath'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExercise>>): void {
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
