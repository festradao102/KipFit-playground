import { IFitUser } from 'app/shared/model/fit-user.model';

export interface IRole {
  id?: number;
  roleId?: number;
  roleName?: string;
  fitUsers?: IFitUser[];
}

export class Role implements IRole {
  constructor(public id?: number, public roleId?: number, public roleName?: string, public fitUsers?: IFitUser[]) {}
}
