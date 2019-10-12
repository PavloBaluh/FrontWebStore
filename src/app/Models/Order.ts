import {Basket} from './Basket';
import {EnumValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator';

export class Order {
  constructor(
    public id: number,
    public orderProducts: Basket[] = [],
    public orderStatus: string,
    public payed: boolean,
    public payType: string,
    public localDateTime: Date
  ) {
  }
}
