import {Product} from './Product';

export class Group {
  constructor(
    public id: number = 0,
    public name: string = '',
    public picture: string = '',
    public products: Product[] = []
  ) {
  }
}
