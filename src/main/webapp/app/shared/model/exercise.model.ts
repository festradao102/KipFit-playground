import { IExerciseType } from 'app/shared/model/exercise-type.model';
import { IExercisesSet } from 'app/shared/model/exercises-set.model';

export interface IExercise {
  id?: number;
  name?: string;
  position?: string;
  instructions?: string;
  videoPath?: string;
  exerciseTypes?: IExerciseType[];
  exercisesSets?: IExercisesSet[];
}

export class Exercise implements IExercise {
  constructor(
    public id?: number,
    public name?: string,
    public position?: string,
    public instructions?: string,
    public videoPath?: string,
    public exerciseTypes?: IExerciseType[],
    public exercisesSets?: IExercisesSet[]
  ) {}
}
