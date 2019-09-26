import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as $ from 'jquery';
import 'node_modules/jquery-ui-slider/jquery-ui.min.js';
import {MainService} from '../../Services/main.service';
import {Product} from '../../Models/Product';
import {DataService} from '../../Services/data.service';

@Component({
  selector: 'app-jquary-range-slider',
  templateUrl: './jquary-range-slider.component.html',
  styleUrls: ['./jquary-range-slider.component.css']
})
export class JquaryRangeSliderComponent implements OnInit {
  maxPrice = 0;
  minPrice = 0;
  @Output() minAndMax = new EventEmitter();
  group = '';

  constructor(private dataService: DataService, private service: MainService) {
    dataService.CurrentGroup.subscribe((group: string) => {
      this.group = group;
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.service.getMinMaxPrice(this.group).subscribe((minMax) => {
      this.dataService.MinMaxPrice.next(minMax);
      this.minPrice = minMax[0];
      this.maxPrice = minMax[1];
      $(document).ready(() => {
          let min = $('#min');
          let max = $('#max');
          min.val(this.minPrice);
          max.val(this.maxPrice);
          $('#slider').slider({
            range: true,
            values: [this.minPrice, this.maxPrice],
            min: this.minPrice,
            max: this.maxPrice,
            slide: (event, elem) => {
              min.val(elem.values[0]);
              max.val(elem.values[1]);
            },
          });
        }
      );
      $('.btn').click(() => {
        let min = $('#min');
        let max = $('#max');
        let minMax;
        if (min.val() === '' || max.val() === '') {
          minMax = [this.minPrice, this.maxPrice];
        } else {
          minMax = [min.val(), max.val()];
        }
        this.minAndMax.emit(minMax);
      });
    });
  }
}
