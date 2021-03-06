import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }
  GoodsChanel = new Subject();
  CurrentGroup = new Subject();
  MinMaxPrice = new Subject();
  UserAucentication = new Subject();
  BasketChanel = new Subject();
  ProductChanel = new Subject();
  AllBasketChanel = new Subject();
  WishesChanel = new Subject();
  CompareChanel = new Subject();
}
