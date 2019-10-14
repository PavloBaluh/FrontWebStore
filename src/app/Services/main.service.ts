import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Category} from '../Models/Category';
import {Product} from '../Models/Product';
import {Property} from '../Models/Property';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private api = 'http://localhost:8080/menu';

  constructor(private http: HttpClient) {
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.api + '/getProductById/' + id);
  }


  getHierarchy(group) {
    return this.http.get(this.api + '/getHierarchy/' + group);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api + '/getCategories');
  }

  getAllGoodsByGroup(name: string, page: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + '/getProductsByGroup/' + name + ',' + page);
  }

  getAllSortedGoods(priceFrom, priceTo, sortBy, limit, sortDirection, group, properties, page): Observable<Product[]> {
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
    params.append('page', page);
    return this.http.post<Product[]>(this.api + '/GetSortedProducts', params);
  }

  getMinMaxPrice(group) {
    return this.http.get(this.api + '/GetMinMaxPriceByGroup/' + group);
  }

  suchProductsByChars(charSequance): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + '/suchProductsByChars/' + charSequance);
  }

  getProductsCount(group, priceFrom, priceTo, props) {
    if (priceTo === undefined) {
      priceTo = 0;
      priceFrom = 0;
      props = '';
    }
    const params = new FormData();
    params.append('priceFrom', priceFrom);
    params.append('priceTo', priceTo);
    params.append('properties', props);
    return this.http.post(this.api + '/getProductsCount/' + group, params);
  }


}
