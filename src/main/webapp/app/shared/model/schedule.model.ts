import { Moment } from 'moment';
import { IGuidedTraining } from 'app/shared/model/guided-training.model';
import { IFitUser } from 'app/shared/model/fit-user.model';

export interface ISchedule {
  id?: number;
  weekDay?: string;
  startHour?: Moment;
  endHour?: Moment;
  guidedTrainings?: IGuidedTraining[];
  fitUsers?: IFitUser[];
}

export class Schedule implements ISchedule {
  constructor(
    public id?: number,
    public weekDay?: string,
    public startHour?: Moment,
    public endHour?: Moment,
    public guidedTrainings?: IGuidedTraining[],
    public fitUsers?: IFitUser[]
  ) {}
}
