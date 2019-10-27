
// @ts-ignore
import {SubCategory} from './/src/app/Models/SubCategory.ts';

export class Category {
  constructor(
    public id: number = 0,
    public name: string = '',
    public subCategories: SubCategory[] = [],
  ) {
  }
}
