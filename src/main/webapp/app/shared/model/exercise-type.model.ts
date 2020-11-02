import { IExercise } from 'app/shared/model/exercise.model';
import { ExercisesSetTypeName } from 'app/shared/model/enumerations/exercises-set-type-name.model';

export interface IExerciseType {
  id?: number;
  typeName?: ExercisesSetTypeName;
  exercise?: IExercise;
}

export class ExerciseType implements IExerciseType {
  constructor(public id?: number, public typeName?: ExercisesSetTypeName, public exercise?: IExercise) {}
}
