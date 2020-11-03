import { IExercisesSet } from 'app/shared/model/exercises-set.model';
import { IPlan } from 'app/shared/model/plan.model';

export interface IRoutine {
  id?: number;
  type?: number;
  name?: string;
  freq?: string;
  exercisesSets?: IExercisesSet[];
  plan?: IPlan;
}

export class Routine implements IRoutine {
  constructor(
    public id?: number,
    public type?: number,
    public name?: string,
    public freq?: string,
    public exercisesSets?: IExercisesSet[],
    public plan?: IPlan
  ) {}
}
