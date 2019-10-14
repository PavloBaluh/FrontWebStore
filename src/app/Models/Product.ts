import {PropertyValue} from './PropertyValue';
import {Group} from './Group';
import {Category} from './Category';

export class Product {
  constructor(
    public id: number = 0,
    public title: string = '',
    public description: string = '',
    public availableNumber: number = 0,
    public warrantyMonths: number = 0,
    public picture: string = '',
    public price: number = 0,
    public rate: number = 0,
    public group: Group,
    public propertyValues: PropertyValue[] = [],
  ) {
  }
}
