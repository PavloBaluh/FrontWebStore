import {PersonalData} from './PersonalData';


export class PersonalAddress {
  constructor(
    public country: string = '',
    public city: string = '',
    public region: string = '',
    public street: string = '',
    public number: string = '',

  ) {
  }
}
