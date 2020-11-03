import { Moment } from 'moment';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ISubscriber } from 'app/shared/model/subscriber.model';

export interface IGuidedTraining {
  id?: number;
  name?: string;
  trainerName?: string;
  capacity?: number;
  date?: Moment;
  activeState?: boolean;
  schedules?: ISchedule[];
  subscribers?: ISubscriber[];
}

export class GuidedTraining implements IGuidedTraining {
  constructor(
    public id?: number,
    public name?: string,
    public trainerName?: string,
    public capacity?: number,
    public date?: Moment,
    public activeState?: boolean,
    public schedules?: ISchedule[],
    public subscribers?: ISubscriber[]
  ) {
    this.activeState = this.activeState || false;
  }
}
