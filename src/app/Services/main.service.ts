import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Category} from '../Models/Category';
import {Product} from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private api = 'http://localhost:8080/menu';

  constructor(private http: HttpClient) {
  }


  getHierarchy(group) {
    return this.http.get(this.api + '/getHierarchy/' + group);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api + '/getCategories');
  }

  getAllGoodsByGroup(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + '/getProductsByGroup/' + name);
  }

  getAllSortedGoods(priceFrom, priceTo, sortBy, limit, sortDirection, group, properties): Observable<Product[]> {
    if (properties === undefined) {
      properties = '';
    }
    const params = new FormData();
    params.append('priceFrom', priceFrom);
    params.append('priceTo', priceTo);
    params.append('sortDirection', sortDirection);
    params.append('sortBy', sortBy);
    params.append('limit', limit);
    params.append('group', group);
    params.append('properties', properties);
    return this.http.post<Product[]>(this.api + '/GetSortedProducts', params);
  }

  getMinMaxPrice(group) {
    return this.http.get(this.api + '/GetMinMaxPriceByGroup/' + group);
  }

}
