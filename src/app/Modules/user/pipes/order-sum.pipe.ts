import {Pipe, PipeTransform} from '@angular/core';
import {Basket} from '../../../Models/Basket';

@Pipe({
  name: 'orderSum'
})
export class OrderSumPipe implements PipeTransform {

  transform(value: Basket[]): any {
    let total = 0;
    value.forEach((basket) => {
      total += basket.product.price * basket.quantity;
    });
    return total;
  }

}
