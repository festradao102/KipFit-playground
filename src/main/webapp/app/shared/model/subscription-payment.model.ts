import { ISubscriber } from 'app/shared/model/subscriber.model';

export interface ISubscriptionPayment {
  id?: number;
  amount?: number;
  subscriber?: ISubscriber;
}

export class SubscriptionPayment implements ISubscriptionPayment {
  constructor(public id?: number, public amount?: number, public subscriber?: ISubscriber) {}
}
