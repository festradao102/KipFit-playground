import { Moment } from 'moment';
import { ISubscriber } from 'app/shared/model/subscriber.model';

export interface IMeasurement {
  id?: number;
  measurementId?: number;
  metabolicage?: number;
  bmr?: number;
  boneMass?: number;
  height?: number;
  weight?: number;
  fatPercentage?: number;
  neck?: number;
  rightArm?: number;
  leftArm?: number;
  wrist?: number;
  core?: number;
  hip?: number;
  thorax?: number;
  rightThigh?: number;
  leftThigh?: number;
  rightCalve?: number;
  leftCalve?: number;
  dateCreated?: Moment;
  subscriber?: ISubscriber;
}

export class Measurement implements IMeasurement {
  constructor(
    public id?: number,
    public measurementId?: number,
    public metabolicage?: number,
    public bmr?: number,
    public boneMass?: number,
    public height?: number,
    public weight?: number,
    public fatPercentage?: number,
    public neck?: number,
    public rightArm?: number,
    public leftArm?: number,
    public wrist?: number,
    public core?: number,
    public hip?: number,
    public thorax?: number,
    public rightThigh?: number,
    public leftThigh?: number,
    public rightCalve?: number,
    public leftCalve?: number,
    public dateCreated?: Moment,
    public subscriber?: ISubscriber
  ) {}
}
