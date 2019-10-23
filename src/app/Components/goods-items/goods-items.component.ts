import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {MainService} from '../../Services/main.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Product} from '../../Models/Product';
import {Observable, Subject} from 'rxjs';
import {DataService} from '../../Services/data.service';
import {UserService} from '../../Modules/user/Services/user.service';

@Component({
  selector: 'app-goods-items',
  templateUrl: './goods-items.component.html',
  styleUrls: ['./goods-items.component.css']
})
export class GoodsItemsComponent implements OnInit {
  goodsToShow: Product[];
  group = this.router.url.split('/')[1].replace('%20', ' ');
  pages = [];
  currentPage = 1;
  isProductsPresent = true;

  constructor(private dataService:
                DataService, private service: MainService, private activatedRoute: ActivatedRoute,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res[3] > 4) {
        this.currentPage = 1;
      }
      this.service.getAllSortedGoods(res[0], res[1], res[2], res[3], res[4], this.group, res[5], this.currentPage - 1)
        .subscribe((sortedGoods) => {
          this.goodsToShow = sortedGoods;
          if (this.goodsToShow.length === 0) {
            this.isProductsPresent = false;
          } else {
            this.isProductsPresent = true;
          }
          this.dataService.GoodsChanel.next(this.goodsToShow);
          this.dataService.GoodsChanel = new Subject<any>();
          this.getProductCount(res[3], res[0], res[1], res[5]);
        });
    });
  }

  getProductCount(limit, priceFrom, priceTo, props) {
    this.service.getProductsCount(this.group, priceFrom, priceTo, props).subscribe((count: number) => {
      this.pages = [];
      const pages = Math.ceil(count / limit);
      for (let i = 1; i <= pages; i++) {
        this.pages.push(i);
      }
    });
  }

  addToCard(el: Product, modalLogin: HTMLDivElement, modalBuy: HTMLDivElement, event: Event) {
    event.stopPropagation();
    this.dataService.ProductChanel.next(el);
    if (localStorage.getItem('_key_') !== null && localStorage.getItem('_key_').startsWith('Bearer')) {
      modalBuy.style.display = 'block';
    } else {
      modalLogin.style.display = 'block';
    }
  }

  addToWishes(el: Product, modalLogin: HTMLDivElement, event: Event) {
    event.stopPropagation();
    if (localStorage.getItem('_key_') !== null && localStorage.getItem('_key_').startsWith('Bearer')) {
      this.userService.addProductToWishes(el).subscribe((res) => {
        if (res === true) {
          this.dataService.WishesChanel.next(true);
        }
      });
    } else {
      modalLogin.style.display = 'block';
    }
  }

  addToCompare(el: Product, modalLogin: HTMLDivElement, modalBuy: HTMLDivElement, event: MouseEvent) {
    event.stopPropagation();
    if (localStorage.getItem('_key_') !== null && localStorage.getItem('_key_').startsWith('Bearer')) {
      this.userService.addProductToCompare(el).subscribe((res) => {
        if (res === true) {
          this.dataService.WishesChanel.next(true);
        }
      });
    } else {
      modalLogin.style.display = 'block';
    }
  }

  changePage(incr) {
    if (incr === 'inc') {
      if (!(this.currentPage > this.pages.length - 1)) {
        this.currentPage++;
      }
    } else if (incr === 'dec') {
      if (!(this.currentPage < 2)) {
        this.currentPage--;
      }
    } else {
      this.currentPage = incr;
    }
    if (this.router.url.search('\\?') === -1) {
      this.service.getAllGoodsByGroup(this.group, this.currentPage - 1).subscribe((res) => {
        this.goodsToShow = res;
      });
    } else {
      this.ngOnInit();
    }
  }
}
