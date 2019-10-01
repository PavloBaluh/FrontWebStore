import {Component, HostListener, OnInit} from '@angular/core';
import {MainService} from '../../Services/main.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Product} from '../../Models/Product';
import {Observable, Subject} from 'rxjs';
import {DataService} from '../../Services/data.service';

@Component({
  selector: 'app-goods-items',
  templateUrl: './goods-items.component.html',
  styleUrls: ['./goods-items.component.css']
})
export class GoodsItemsComponent implements OnInit {
  goodsToShow: Product[];
  group = this.router.url.split('/')[1].replace('%20', ' ');

  constructor(private dataService: DataService, private service: MainService, private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res[0] === undefined) {
        this.defaultLoad();
      } else {
        this.service.getAllSortedGoods(res[0], res[1], res[2], res[3], res[4], this.group, res[5]).subscribe((sortedGoods) => {
          this.goodsToShow = sortedGoods;
          console.log(this.goodsToShow);
        });
      }
    });
  }


  defaultLoad() {
    this.service.getAllGoodsByGroup(this.group).subscribe((res) => {
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
}
