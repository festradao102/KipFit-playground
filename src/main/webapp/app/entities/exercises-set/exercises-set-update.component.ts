import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExercisesSet, ExercisesSet } from 'app/shared/model/exercises-set.model';
import { ExercisesSetService } from './exercises-set.service';
import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from 'app/entities/exercise/exercise.service';
import { IRoutine } from 'app/shared/model/routine.model';
import { RoutineService } from 'app/entities/routine/routine.service';

type SelectableEntity = IExercise | IRoutine;

@Component({
  selector: 'jhi-exercises-set-update',
  templateUrl: './exercises-set-update.component.html',
})
export class ExercisesSetUpdateComponent implements OnInit {
  isSaving = false;
  exercises: IExercise[] = [];
  routines: IRoutine[] = [];

  editForm = this.fb.group({
    id: [],
    type: [],
    restTime: [],
    exercises: [],
    routine: [],
  });

  constructor(
    protected exercisesSetService: ExercisesSetService,
    protected exerciseService: ExerciseService,
    protected routineService: RoutineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exercisesSet }) => {
      this.updateForm(exercisesSet);

      this.exerciseService.query().subscribe((res: HttpResponse<IExercise[]>) => (this.exercises = res.body || []));

      this.routineService.query().subscribe((res: HttpResponse<IRoutine[]>) => (this.routines = res.body || []));
    });
  }

  updateForm(exercisesSet: IExercisesSet): void {
    this.editForm.patchValue({
      id: exercisesSet.id,
      type: exercisesSet.type,
      restTime: exercisesSet.restTime,
      exercises: exercisesSet.exercises,
      routine: exercisesSet.routine,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exercisesSet = this.createFromForm();
    if (exercisesSet.id !== undefined) {
      this.subscribeToSaveResponse(this.exercisesSetService.update(exercisesSet));
    } else {
      this.subscribeToSaveResponse(this.exercisesSetService.create(exercisesSet));
    }
  }

  private createFromForm(): IExercisesSet {
    return {
      ...new ExercisesSet(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      restTime: this.editForm.get(['restTime'])!.value,
      exercises: this.editForm.get(['exercises'])!.value,
      routine: this.editForm.get(['routine'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExercisesSet>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IExercise[], option: IExercise): IExercise {
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
