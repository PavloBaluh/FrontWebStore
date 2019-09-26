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
  properties = [];
  propertiesValues = [];
  hierarchy = [];
  group = '';
  sortDirection = 'asc';
  sortBy = 'title';
  limit = 4;
  priceFrom = 0;
  priceTo = 0;
  propertiesSort = [];

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute,
              private service: MainService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.group = param.name;
      this.sortDirection = 'asc';
      this.sortBy = 'title';
      this.limit = 4;
      this.dataService.CurrentGroup.next(this.group);
      this.getHierarchy();
      this.router.navigate([param.name + '/goods/sort']);
      this.dataService.MinMaxPrice.subscribe((minMax) => {
        this.priceFrom = minMax[0];
        this.priceTo = minMax[1];
      });
      this.dataService.GoodsChanel.subscribe((res: Product[]) => {
          this.getProperties(res);
        }
      );
    });
  }


  getHierarchy() {
    this.service.getHierarchy(this.group).subscribe((res: Array<string>) => {
      this.hierarchy = res;
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


  getProperties(goods: Product[]) {
    let arr: PropertyValue[] = [];
    let unicArr: PropertyValue[] = [];
    let unicProp: Property[] = [];
    goods.forEach((propArr) => {
      propArr.propertyValues.forEach((propValue) => {
        if (propValue.id !== undefined) {
          arr.push(propValue);
        }
      });
    });
    arr.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    unicArr[0] = arr[0];
    unicProp[0] = arr[0].property;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].id !== arr[i - 1].id) {
        unicArr.push(arr[i]);
      }
      if (arr[i].property.propertyName !== arr[i - 1].property.propertyName) {
        unicProp.push(arr[i].property);
      }
    }
    this.propertiesValues = unicArr;
    this.properties = unicProp;
  }

  getPropertiesValue(property: Property, propertyValue: PropertyValue) {
    if (propertyValue.property.propertyName === property.propertyName) {
      return propertyValue.value;
    }
    return '';
  }

  selectPropertyValue(propertyValue, input) {
    if (input.checked === false) {
      this.propertiesSort.push(propertyValue.id);
    } else {
      this.propertiesSort.splice(this.propertiesSort.indexOf(propertyValue.id), 1);
    }
    this.sort();
  }
}
