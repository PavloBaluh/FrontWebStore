import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../Modules/user/Services/user.service';
import {cursorTo} from 'readline';
import {MainService} from '../../Services/main.service';
import {Product} from '../../Models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('1', {static: true}) radio1: ElementRef;
  @ViewChild('2', {static: true}) radio2: ElementRef;
  @ViewChild('3', {static: true}) radio3: ElementRef;
  @ViewChild('4', {static: true}) radio4: ElementRef;
  @ViewChild('5', {static: true}) radio5: ElementRef;
  @ViewChild('select1', {static: true}) select1: ElementRef;
  currentSlider;
  show: Product[];
  mostPopular: Product[];
  latest: Product[];

  constructor(private service: MainService) {
  }

  ngOnInit() {
    this.goodsRate();
    const sliderArray = [this.radio1, this.radio2, this.radio3, this.radio4, this.radio5];
    this.currentSlider = sliderArray[0];
    setInterval(() => {
      this.slide(this.currentSlider, sliderArray);
    }, 3000);
  }

  private goodsRate() {
    this.service.getMostPopularProducts().subscribe((products: Product[]) => {
      this.mostPopular = products;
      console.log(products);
      this.show = this.mostPopular;
    });
    this.service.getMostLatestProducts().subscribe((products: Product[]) => {
      console.log(products);
      this.latest = products;
    });
    this.select1.nativeElement.style.borderColor = 'rgb(0, 128, 153)';
  }

  slide(currentSlider, sliderArray) {
    if (sliderArray.indexOf(currentSlider) === 4) {
      this.currentSlider = this.radio1;
      this.radio1.nativeElement.checked = true;
    } else {
      sliderArray[sliderArray.indexOf(currentSlider) + 1].nativeElement.checked = true;
      this.currentSlider = sliderArray[sliderArray.indexOf(currentSlider) + 1];
    }
  }

  change(select1: HTMLDivElement, select2: HTMLDivElement, show) {
    if (show === 1) {
      this.show = this.mostPopular;
    }
    if (show === 2) {
      this.show = this.latest;
    }
    select1.style.borderColor = 'rgb(0, 128, 153)';
    select2.style.borderColor = 'white';
  }
}
