import {Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {log} from 'util';
import {Category} from './Models/Category';
import {SubCategory} from './Models/SubCategory';
import {Group} from './Models/Group';
import {MainService} from './Services/main.service';
import {User} from './Models/User';
import {UserService} from './Services/user.service';
import {DataService} from './Services/data.service';
import {Product} from './Models/Product';
import {Basket} from './Models/Basket';
import * as $ from 'jquery';


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
  elem = null;
  down = null;
  user: User = null;
  isAuthenticated = false;
  isAnonimUser = false;
  like = 0;
  shoppingCard = 0;
  productsInCart: Basket[] = [];
  showMiniBasket = false;

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

  }

  miniGoods() {
    this.dataService.BasketChanel.subscribe((res: Basket) => {
      if (res !== undefined) {
        this.userService.addProductInCart(res);
        this.shoppingCard += 1;
        this.productsInCart.push(res);
        if (this.productsInCart.length > 2) {
          this.productsInCart = [this.productsInCart[1], this.productsInCart[2]];
        }
        this.showMiniBasket = true;
        this.timeOut();
      }
    });
  }

  timeOut() {
    setTimeout(() => {
      this.showMiniBasket = false;
    }, 7000);
  }

  toUserMenu() {
    this.router.navigate(['userMenu/userInfo']);
  }

  viewCard() {

  }
}
