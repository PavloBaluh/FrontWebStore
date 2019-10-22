import {Component, OnInit} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {Order} from '../../../../Models/Order';
import {Router} from '@angular/router';
import {Basket} from '../../../../Models/Basket';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[];
  isOrdersPresent = false;
  isOrdersNotPreset = false;
  showMore = false;
  products: Basket[] = [];

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getAllUserOrders().subscribe(orders => {
      if (orders === null) {
        this.isOrdersPresent = false;
        this.isOrdersNotPreset = true;
      } else {
        this.orders = orders;
        this.isOrdersPresent = true;
        this.isOrdersNotPreset = false;
      }
    });
  }

  showMoreProducts(products: Basket[]) {
    this.products = products;
    this.showMore = true;
  }

  addData() {
    this.router.navigate(['/']);
  }

}
