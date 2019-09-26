import {Group} from './Group';


export class SubCategory {
  constructor(
    public name: string = '',
    public groups: Group[] = [] ,
    public picture: string = ''
  ) {
  }
}
