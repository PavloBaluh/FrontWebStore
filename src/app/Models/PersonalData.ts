import {User} from './User';
import {Address} from 'cluster';
import {PersonalAddress} from './PersonalAddress';

export class PersonalData {
  constructor(
    public  name: string = '',
    public surname: string = '',
    public  phoneNumber: string = '',
    public picture: string = '',
    public address: PersonalAddress = null,
  ) {
  }
}
