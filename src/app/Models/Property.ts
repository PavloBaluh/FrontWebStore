import {PropertyValue} from './PropertyValue';
import {SubCategory} from './SubCategory';

export class Property {
  constructor(
    public id: number = 0,
    public propertyName: string = '',
    public values: PropertyValue[] = [],
    public subCategory: SubCategory,
  ) {
  }
}
