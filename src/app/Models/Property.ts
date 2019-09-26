import {PropertyValue} from './PropertyValue';

export class Property {
  constructor(
    public id: number = 0,
    public propertyName: string = '',
    public values: PropertyValue[] = [],
  ) {
  }
}
