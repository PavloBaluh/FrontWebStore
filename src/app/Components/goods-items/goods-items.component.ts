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

  constructor(private dataService:
                DataService, private service: MainService, private activatedRoute: ActivatedRoute,
              private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res[0] === undefined) {
        this.defaultLoad();
        this.getProductCount(4, res[0], res[1], res[5]);
      } else {
        this.service.getAllSortedGoods(res[0], res[1], res[2], res[3], res[4], this.group, res[5], this.currentPage - 1)
          .subscribe((sortedGoods) => {
            this.goodsToShow = sortedGoods;
            this.getProductCount(res[3], res[0], res[1], res[5]);
          });
      }
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


  defaultLoad() {
    this.service.getAllGoodsByGroup(this.group, this.currentPage - 1).subscribe((res) => {
      this.goodsToShow = res;
      this.dataService.GoodsChanel.next(this.goodsToShow);
      this.dataService.GoodsChanel = new Subject<any>();
    });
  }

  addToCard(el: Product, modalLogin: HTMLDivElement, modalBuy: HTMLDivElement) {
    this.dataService.ProductChanel.next(el);
    if (localStorage.getItem('_key_') !== null && localStorage.getItem('_key_').startsWith('Bearer')) {
      modalBuy.style.display = 'block';
    } else {
      modalLogin.style.display = 'block';
    }
  }

  addToWishes(el: Product) {
    this.userService.addProductToWishes(el).subscribe((res) => {
      if (res === true) {
        this.dataService.WishesChanel.next(true);
      }
    });
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
      console.log('d ');
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
