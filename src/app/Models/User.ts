import {PersonalData} from './PersonalData';

export class User {
  constructor(
    public id: number = 0,
    public username: string = '',
    public password: string = '',
    public email: string = '',
    public personalData: PersonalData = null,
    public accountNonLocked: boolean = false,
  ) {
  }
}
