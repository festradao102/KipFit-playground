import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ISubscriber } from 'app/shared/model/subscriber.model';
import { ISchedule } from 'app/shared/model/schedule.model';
import { IRole } from 'app/shared/model/role.model';

export interface IFitUser {
  id?: number;
  legalId?: string;
  bday?: Moment;
  phone?: string;
  emergencyPhone?: string;
  user?: IUser;
  subscriber?: ISubscriber;
  schedules?: ISchedule[];
  role?: IRole;
}

export class FitUser implements IFitUser {
  constructor(
    public id?: number,
    public legalId?: string,
    public bday?: Moment,
    public phone?: string,
    public emergencyPhone?: string,
    public user?: IUser,
    public subscriber?: ISubscriber,
    public schedules?: ISchedule[],
    public role?: IRole
  ) {}
}
