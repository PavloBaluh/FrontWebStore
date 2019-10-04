// @ts-ignore
import {SubCategory} from './/src/app/Models/SubCategory.ts';
import {User} from './User';
import {Product} from './Product';

export class Basket {
  constructor(
    public user: User = null,
    public product: Product,
    public quantity: number,
  ) {
  }
}
