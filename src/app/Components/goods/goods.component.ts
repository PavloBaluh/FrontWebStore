import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainService} from '../../Services/main.service';
import * as $ from 'jquery';
import 'node_modules/jquery-ui-slider/jquery-ui.min.js';
import {Product} from '../../Models/Product';
import {PropertyValue} from '../../Models/PropertyValue';
import {promptGlobalAnalytics} from '@angular/cli/models/analytics';
import {Property} from '../../Models/Property';
import {DataService} from '../../Services/data.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  @ViewChild('dropdown', {static: true}) dropdown: ElementRef;
  @ViewChild('dropdown1', {static: true}) dropdown1: ElementRef;
  @ViewChild('dropdown2', {static: true}) dropdown2: ElementRef;
  properties: Property[] = [];
  hierarchy = [];
  group = '';
  sortDirection = 'asc';
  sortBy = 'title';
  limit = 4;
  priceFrom = 0;
  priceTo = 0;
  propertiesSort = [];
  inputPropertyId = 0;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute,
              private service: MainService, private router: Router, mainService: MainService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      if (param.name.includes('+')) {
        this.group = param.name.split('+')[0];
        this.propertiesSort = [param.name.split('+')[1]];
        this.inputPropertyId = param.name.split('+')[1];
      } else {
        this.group = param.name;
      }
      this.dataService.CurrentGroup.next(this.group);
      this.getHierarchy();
      this.service.getMinMaxPrice(this.group).subscribe((res) => {
        this.priceFrom = res[0];
        this.priceTo = res[1];
        this.sort();
      });
      this.dataService.MinMaxPrice.subscribe((minMax) => {
        this.priceFrom = minMax[0];
        this.priceTo = minMax[1];
      });
    });
  }


  getHierarchy() {
    this.service.getHierarchy(this.group).subscribe((res: Array<string>) => {
      this.hierarchy = res;
      this.getAllProperties();
    });
  }


  getAllProperties() {
    this.service.getAllProperties(this.hierarchy[1]).subscribe((res) => {
      this.properties = res;
      this.properties.forEach(value => {
        value.values.forEach(value1 => {
          value1.active = true;
        });
      });
      if (this.inputPropertyId !== 0) {
        this.properties.forEach(value => {
          value.values.forEach(value1 => {
            if (value1.id == this.inputPropertyId) {
              value.values.forEach(value2 => {
                if (value2.id == this.inputPropertyId) {
                  value2.active = true;
                } else {
                  value2.active = false;
                }
              });
            }
          });
        });
      }
    });
  }

  showDropDown(select: HTMLDivElement, dropdown) {
    select.style.border = '2px solid rgb(135, 206, 235)';
    dropdown.style.display = 'block';
  }

  changeSortBy(event, dropdown) {
    event.stopPropagation();
    this.sortBy = event.target.textContent;
    dropdown.style.display = 'none';
    this.sort();
  }

  changeSortDirection(event, dropdown) {
    event.stopPropagation();
    this.sortDirection = event.target.textContent;
    dropdown.style.display = 'none';
    this.sort();
  }

  changeSortLimit(event, dropdown) {
    event.stopPropagation();
    this.limit = event.target.textContent;
    dropdown.style.display = 'none';
    this.sort();
  }

  changeMinAndMaxPrice(param) {
    this.priceFrom = param[0];
    this.priceTo = param[1];
    this.sort();
  }

  sort() {
    this.router.navigate([this.group + '/goods/sort'],
      {queryParams: [this.priceFrom, this.priceTo, this.sortBy, this.limit, this.sortDirection, this.propertiesSort]});
  }

  selectPropertyValue(propertyValue: PropertyValue, input: HTMLInputElement, property: Property) {
    if (propertyValue.active === false) {
      return;
    }
    if (input.checked === false) {
      this.propertiesSort.push(propertyValue.id);
      property.values.forEach(value => {
        if (value !== propertyValue) {
          value.active = false;
        }
      });
    } else {
      this.propertiesSort.splice(this.propertiesSort.indexOf(propertyValue.id), 1);
      property.values.forEach(value => {
        if (value.active === false) {
          value.active = true;
        }
      });
    }
    this.sort();
  }
}
