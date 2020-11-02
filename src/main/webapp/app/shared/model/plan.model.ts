import { Moment } from 'moment';
import { IRoutine } from 'app/shared/model/routine.model';
import { IObjectiveType } from 'app/shared/model/objective-type.model';
import { ISubscriber } from 'app/shared/model/subscriber.model';

export interface IPlan {
  id?: number;
  objective?: string;
  dateCreated?: Moment;
  creatorName?: string;
  active?: boolean;
  routines?: IRoutine[];
  objectiveTypes?: IObjectiveType[];
  subscriber?: ISubscriber;
}

export class Plan implements IPlan {
  constructor(
    public id?: number,
    public objective?: string,
    public dateCreated?: Moment,
    public creatorName?: string,
    public active?: boolean,
    public routines?: IRoutine[],
    public objectiveTypes?: IObjectiveType[],
    public subscriber?: ISubscriber
  ) {
    this.active = this.active || false;
  }
}
