import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {cursorTo} from 'readline';

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
  currentSlider;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    const sliderArray = [this.radio1, this.radio2, this.radio3, this.radio4, this.radio5];
    this.currentSlider = sliderArray[0];
    setInterval(() => {
      this.slide(this.currentSlider, sliderArray);
    }, 3000);
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
}
