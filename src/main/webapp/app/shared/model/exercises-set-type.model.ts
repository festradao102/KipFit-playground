import { IExercisesSet } from 'app/shared/model/exercises-set.model';
import { ExercisesSetTypeName } from 'app/shared/model/enumerations/exercises-set-type-name.model';

export interface IExercisesSetType {
  id?: number;
  typeName?: ExercisesSetTypeName;
  exercisesSet?: IExercisesSet;
}

export class ExercisesSetType implements IExercisesSetType {
  constructor(public id?: number, public typeName?: ExercisesSetTypeName, public exercisesSet?: IExercisesSet) {}
}
