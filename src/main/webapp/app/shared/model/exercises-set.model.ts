import { IExercisesSetType } from 'app/shared/model/exercises-set-type.model';
import { IExercise } from 'app/shared/model/exercise.model';
import { IRoutine } from 'app/shared/model/routine.model';

export interface IExercisesSet {
  id?: number;
  type?: number;
  restTime?: number;
  exercisesSetTypes?: IExercisesSetType[];
  exercises?: IExercise[];
  routine?: IRoutine;
}

export class ExercisesSet implements IExercisesSet {
  constructor(
    public id?: number,
    public type?: number,
    public restTime?: number,
    public exercisesSetTypes?: IExercisesSetType[],
    public exercises?: IExercise[],
    public routine?: IRoutine
  ) {}
}
