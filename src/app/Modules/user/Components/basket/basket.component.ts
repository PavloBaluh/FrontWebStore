import {Component, OnInit} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {Basket} from '../../../../Models/Basket';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {DataService} from '../../../../Services/data.service';
import {Product} from '../../../../Models/Product';
import {ActivatedRoute, Router} from '@angular/router';
import {isEmpty} from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  products: Basket[];
  total: number = 0;
  isEmpty = false;
  isNotEmpty = false;

  constructor(private service: UserService, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.service.getAllProductsFromCart().subscribe((res: Basket[]) => {
      if (res !== null) {
        this.isNotEmpty = true;
        this.isEmpty = false;
        this.products = res;
        res.forEach((el) => {
          this.total += (el.product.price * el.quantity);
        });
      } else {
        this.isNotEmpty = false;
        this.isEmpty = true;
      }
    });
  }


  deleteFromBasket(product: any) {
    this.service.deleteFromBasket(product).subscribe((res) => {
      if (res) {
        this.total -= (product.product.price * product.quantity);
        if (this.total === 0) {
          this.isNotEmpty = false;
          this.isEmpty = true;
        }
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    this.service.getAllProductsFromCart().subscribe((res: Basket[]) => {
      this.products = res;
      this.dataService.AllBasketChanel.next(res);
    });
  }

  makeOrder() {
    this.router.navigate(['/userMenu/checkout']);
  }
}

