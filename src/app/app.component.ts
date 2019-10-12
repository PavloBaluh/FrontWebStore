import {Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {log} from 'util';
import {Category} from './Models/Category';
import {SubCategory} from './Models/SubCategory';
import {Group} from './Models/Group';
import {MainService} from './Services/main.service';
import {User} from './Models/User';
import {UserService} from './Modules/user/Services/user.service';
import {DataService} from './Services/data.service';
import {Product} from './Models/Product';
import {Basket} from './Models/Basket';
import * as $ from 'jquery';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {templateJitUrl} from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('anonimIcons', {static: true}) anonimIcons: ElementRef;
  @ViewChild('userIcons', {static: true}) userIcons: ElementRef;
  @ViewChild('header2', {static: true}) header2: ElementRef;
  @ViewChild('header3', {static: true}) header3: ElementRef;

  menuElements: Category[] = [];
  suchProducts: Product[] = [];
  elem = null;
  down = null;
  user: User = null;
  isAuthenticated = false;
  isAnonimUser = false;
  compare = 0;
  like = 0;
  shoppingCard = 0;
  productsInCart: Basket[] = [];
  showMiniBasket = false;
  dropdown1: HTMLDivElement;
  suchInp: HTMLDivElement;

  constructor(private service: MainService, private userService: UserService, private dataService: DataService, private router: Router) {
    this.service.getAllCategories().subscribe((res) => {
      this.menuElements = res;
    });
  }

  @HostListener('document:click', ['$event.target'])
  click(trg) {
    if (!(trg.contains(this.down)) && (this.elem != null) && (this.down != null)) {
      this.down.style.display = 'none';
      this.elem.style.color = 'white';
      this.elem.style.backgroundColor = 'rgb(28, 99, 96)';
    }
    if ((this.dropdown1 !== undefined) && (trg !== this.dropdown1) && (trg !== this.suchInp)) {
      this.dropdown1.style.display = 'none';
    }
  }

  showList(elem, down) {
    this.elem = elem;
    this.down = down;
    if (down.style.display === 'block') {
      down.style.display = 'none';
      elem.style.color = 'white';
      elem.style.backgroundColor = 'rgb(28, 99, 96)';
    } else {
      down.style.display = 'block';
      elem.style.color = 'rgb(28, 99, 96)';
      elem.style.backgroundColor = 'white';
    }
  }

  navigateToMenu(elem) {
    this.router.navigate(['menu', elem]);
  }

  showGoods(elem, name, event: Event, down) {
    elem.style.color = 'white';
    elem.style.backgroundColor = 'rgb(28, 99, 96)';
    down.style.display = 'none';
    event.stopPropagation();
    if (!(this.router.url.split('?')[0] === ('/' + name + '/goods/sort').replace(' ', '%20'))) {
      this.router.navigate([name + '/goods']);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('_key_') !== null && localStorage.getItem('_key_').startsWith('Bearer')) {
      this.userService.getAuthentication().subscribe((user) => {
        if (user != null) {
          this.user = user;
          this.isAuthenticated = true;
        }
      });
    } else {
      this.isAnonimUser = true;
    }
    this.dataService.UserAucentication.subscribe((name) => {
      this.userService.getAuthentication().subscribe((userAfterLogin) => {
        if (userAfterLogin === null) {
          this.user = null;
          this.isAnonimUser = true;
          this.isAuthenticated = false;
        } else {
          this.user = userAfterLogin;
          this.isAnonimUser = false;
          this.isAuthenticated = true;
        }
      });
    });
    this.miniGoods();
    this.wishes();
  }

  wishes() {
    this.userService.getAllWishes().subscribe((res) => {
      this.like = res.length;
    });
    this.dataService.WishesChanel.subscribe((res) => {
      if (res === true) {
        this.like += 1;
      }
      if (res === false) {
        this.like -= 1;
      }
    });
  }

  miniGoods() {
    this.userService.getAllProductsFromCart().subscribe((products: Basket[]) => {
      if (products != null) {
        this.shoppingCard = products.length;
        if (this.shoppingCard === 1) {
          this.productsInCart = [products[0]];
        } else {
          this.productsInCart = [products[products.length - 1], products[products.length - 2]];
        }
      }
    });
    this.dataService.BasketChanel.subscribe((res: Basket) => {
      if (res !== undefined) {
        this.shoppingCard += 1;
        this.productsInCart.push(res);
        if (this.productsInCart.length > 2) {
          this.productsInCart = [this.productsInCart[1], this.productsInCart[2]];
        }
        this.showMiniBasket = true;
        this.timeOut();
      }
    });
    this.dataService.AllBasketChanel.subscribe((allBasket: Basket[]) => {
      if (allBasket === null) {
        this.productsInCart = [];
        this.shoppingCard = 0;
      } else {
        this.shoppingCard -= 1;
        if (this.shoppingCard === 1) {
          this.productsInCart = [allBasket[0]];
        } else {
          this.productsInCart = [allBasket[allBasket.length - 1], allBasket[allBasket.length - 2]];
        }
      }
    });
  }

  timeOut() {
    setTimeout(() => {
      this.showMiniBasket = false;
    }, 7000);
  }


  showCart(event: Event) {
    event.stopPropagation();
    this.router.navigate(['userMenu/cart']);
    this.showMiniBasket = false;
  }

  private such(dropdown: HTMLDivElement, suchInp: HTMLDivElement) {
    this.dropdown1 = dropdown;
    this.suchInp = suchInp;
    dropdown.style.display = 'block';
    $(document).ready(() => {
      $('#such').keyup(() => {
        const val = $('#such').val();
        if (val !== '') {
          this.service.suchProductsByChars(val).subscribe((res) => {
            this.suchProducts = res;
          });
        } else {
          this.suchProducts = [];
        }
      });
    });
  }
}
