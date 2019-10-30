import {Component, OnInit} from '@angular/core';
import {AdminService} from '../Services/admin.service';
import {Property} from '../../../Models/Property';
import {PropertyValue} from '../../../Models/PropertyValue';

@Component({
  selector: 'app-properies-tree',
  templateUrl: './properies-tree.component.html',
  styleUrls: ['./properies-tree.component.css']
})
export class ProperiesTreeComponent implements OnInit {

  properties: Property[];
  private componentToDelete;
  propertySelected = false;
  propertyValueSelected = false;
  currentProperty: Property;
  currrentPropertyValue: PropertyValue;
  placeHolder = '';
  isPropDelete;

  constructor(private service: AdminService) {
  }

  ngOnInit() {
    this.service.getAllProperties().subscribe((res: Property[]) => {
      this.properties = res;
    });
  }

  reload() {
    this.ngOnInit();
  }

  addProperty() {
    this.service.addProperty().subscribe((prop) => {
      this.properties.push(prop);
    });
  }

  editProperty(property: Property) {
    this.propertySelected = true;
    this.currentProperty = property;
    this.placeHolder = property.propertyName;
  }

  addPropertyValue(property: Property) {
    this.service.addPropertyValue(property).subscribe((propV: PropertyValue) => {
      this.properties.forEach((prop) => {
        if (prop.id === property.id) {
          prop.values.push(propV);
        }
      });
    });
  }

  showModal(modal: HTMLDivElement, property) {
    console.log(property);
    if (property.hasOwnProperty('propertyName')) {
      this.currentProperty = property;
      this.isPropDelete = true;
    }
    if (property.hasOwnProperty('value')) {
      this.currrentPropertyValue = property;
      this.isPropDelete = false;
    }
    modal.style.display = 'block';
  }

  wrap(sub: HTMLDivElement) {
    if (sub.style.display === 'block') {
      sub.style.display = 'none';
    } else {
      sub.style.display = 'block';
    }
  }

  editValue(value: PropertyValue) {
    this.placeHolder = value.value;
    this.propertyValueSelected = true;
    this.propertySelected = false;
    this.currrentPropertyValue = value;
  }

  changeName(text: HTMLInputElement) {
    const regExpUsername = new RegExp('\\w[A-Za-z0-9]{1,12}');
    if (regExpUsername.test(text.value)) {
      if (this.propertySelected) {
        this.service.renameProperty(this.currentProperty, text.value).subscribe((res) => {
          if (res) {
            this.placeHolder = text.value;
            text.value = '';
          }
        });
      }
      if (this.propertyValueSelected) {
        this.service.renamePropertyValue(this.currrentPropertyValue, text.value).subscribe((res) => {
          if (res) {
            this.placeHolder = text.value;
            text.value = '';
          }
        });
      }
    }
  }

  remove(modale: HTMLDivElement) {
    if (this.isPropDelete) {
      this.service.removeProperty(this.currentProperty).subscribe((res) => {
        this.propertySelected = false;
        modale.style.display = 'none';
      });
    }
    if (!this.isPropDelete) {
      this.service.removePropertyValue(this.currrentPropertyValue).subscribe((res) => {
        this.propertyValueSelected = false;
        modale.style.display = 'none';
      });
     }
  }
}
