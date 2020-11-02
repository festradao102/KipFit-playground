import { IPlan } from 'app/shared/model/plan.model';

export interface IObjectiveType {
  id?: number;
  objectiveName?: string;
  description?: string;
  plan?: IPlan;
}

export class ObjectiveType implements IObjectiveType {
  constructor(public id?: number, public objectiveName?: string, public description?: string, public plan?: IPlan) {}
}
