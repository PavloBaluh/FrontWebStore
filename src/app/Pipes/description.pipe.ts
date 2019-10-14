import {Pipe, PipeTransform} from '@angular/core';
import {PropertyValue} from '../Models/PropertyValue';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(value: PropertyValue[], ...args: any[]): any {
    const description = [];
    value.forEach((value1 => {
      description.push(value1.property.propertyName + ': ' +  value1.value);
    }));
    return description;
  }

}
