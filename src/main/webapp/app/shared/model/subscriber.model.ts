import { Moment } from 'moment';
import { ISubscriptionPayment } from 'app/shared/model/subscription-payment.model';
import { IMeasurement } from 'app/shared/model/measurement.model';
import { IPlan } from 'app/shared/model/plan.model';
import { IGuidedTraining } from 'app/shared/model/guided-training.model';
import { IFitUser } from 'app/shared/model/fit-user.model';

export interface ISubscriber {
  id?: number;
  initialDate?: Moment;
  medicalConditions?: string;
  paymentFreq?: string;
  subscriptionPayment?: ISubscriptionPayment;
  measurements?: IMeasurement[];
  plans?: IPlan[];
  guidedTrainings?: IGuidedTraining[];
  fitUser?: IFitUser;
}

export class Subscriber implements ISubscriber {
  constructor(
    public id?: number,
    public initialDate?: Moment,
    public medicalConditions?: string,
    public paymentFreq?: string,
    public subscriptionPayment?: ISubscriptionPayment,
    public measurements?: IMeasurement[],
    public plans?: IPlan[],
    public guidedTrainings?: IGuidedTraining[],
    public fitUser?: IFitUser
  ) {}
}
