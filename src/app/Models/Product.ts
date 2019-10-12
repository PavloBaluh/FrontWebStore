import {PropertyValue} from './PropertyValue';

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
    public propertyValues: PropertyValue[] = [],
  ) {
  }
}
