import {Property} from './Property';

export class PropertyValue {
  constructor(
    public  id: number = 0,
    public  value: string = '',
    public  property: Property
  ) {
  }
}
