
// @ts-ignore
import {SubCategory} from './/src/app/Models/SubCategory.ts';

export class Category {
  constructor(
    public name: string = '',
    public subCategories: SubCategory[] = [],
  ) {
  }
}
