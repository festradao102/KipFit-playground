export interface ISystemParameter {
  id?: number;
  gymName?: string;
  logoPath?: string;
}

export class SystemParameter implements ISystemParameter {
  constructor(public id?: number, public gymName?: string, public logoPath?: string) {}
}
