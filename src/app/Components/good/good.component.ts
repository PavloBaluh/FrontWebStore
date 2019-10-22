import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../Models/Product';
import {MainService} from '../../Services/main.service';
import {Group} from '../../Models/Group';
import {DataService} from '../../Services/data.service';
import {UserService} from '../../Modules/user/Services/user.service';
import {PropertyValue} from '../../Models/PropertyValue';
import {Property} from '../../Models/Property';

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.css']
})
export class GoodComponent implements OnInit {
  product: Product = new Product(0, '', '', 0, 0, '', 0, 0,
    new Group('', ''));
  category = '';
  subCategory = '';
  group = '';
  properties: Property[] = [];

  constructor(private acticatedRoute: ActivatedRoute, private service: MainService, private dataService: DataService, private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.acticatedRoute.params.subscribe((res) => {
      if (res.id > 0) {
        this.service.getProductById(res.id).subscribe((map: object) => {
          // @ts-ignore
          this.product = map.product;
          // @ts-ignore
          this.properties = map.properties;
          this.service.getHierarchy(this.product.group.name).subscribe((hier) => {
            this.category = hier[2];
            this.subCategory = hier[1];
            this.group = hier[0];
          });
        });
      }
    });
  }

  addToCart(modalBuy: HTMLDivElement, modaleLogin: HTMLDivElement) {
    if (localStorage.getItem('_key_') !== null && localStorage.getItem('_key_').startsWith('Bearer')) {
      this.dataService.ProductChanel.next(this.product);
      modalBuy.style.display = 'block';
    } else {
      modaleLogin.style.display = 'block';
    }
  }

  addToWishes(modaleLogin: HTMLDivElement) {
    if (localStorage.getItem('_key_') !== null && localStorage.getItem('_key_').startsWith('Bearer')) {
      this.userService.addProductToWishes(this.product).subscribe((res) => {
        if (res === true) {
          this.dataService.WishesChanel.next(true);
        }
      });
    } else {
      modaleLogin.style.display = 'block';
    }
  }

  getByPropValue(prop: Property) {
    this.router.navigate([this.group + '+' + prop.values[0].id + '/goods/']);
  }
}
