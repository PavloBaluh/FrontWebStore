import {PersonalData} from './PersonalData';

export class User {
  constructor(
    public username: string = '',
    public password: string = '',
    public email: string = '',
    public personalData: PersonalData = null,
  ) {
  }
}
