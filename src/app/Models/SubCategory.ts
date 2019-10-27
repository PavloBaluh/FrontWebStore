import {Group} from './Group';


export class SubCategory {
  constructor(
    public id: number = 0,
    public name: string = '',
    public groups: Group[] = [] ,
    public picture: string = ''
  ) {
  }
}
