import {Component, OnInit} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {MainService} from '../../../../Services/main.service';
import {Product} from '../../../../Models/Product';
import {DataService} from '../../../../Services/data.service';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.css']
})
export class WishesComponent implements OnInit {
  goodsToShow: Product[] = [];
  isDataNotPresent = false;
  isDataPresent = false;

  constructor(private userService: UserService, private dataService: DataService) {
  }

  ngOnInit() {
    this.userService.getAllWishes().subscribe((res) => {
      if (res.length > 0) {
        this.goodsToShow = res;
        this.isDataPresent = true;
        this.isDataNotPresent = false;
      } else {
        this.isDataPresent = false;
        this.isDataNotPresent = true;
      }
    });
  }

  deleteFromWishes(product: Product) {
    this.userService.deleteFromWishes(product).subscribe((res) => {
      if (res === true) {
        this.dataService.WishesChanel.next(false);
        this.goodsToShow.splice(this.goodsToShow.indexOf(product), 1);
        if (this.goodsToShow.length === 0) {
          this.isDataPresent = false;
          this.isDataNotPresent = true;
        }
      }
    });
  }

  moveToBasket(el: Product, modal: HTMLDivElement) {
    this.dataService.ProductChanel.next(el);
    modal.style.display = 'block';
    this.deleteFromWishes(el);
  }
}
