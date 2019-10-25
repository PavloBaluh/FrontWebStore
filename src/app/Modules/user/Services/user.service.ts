import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../Models/User';
import {PersonalData} from '../../../Models/PersonalData';
import {hasOwnProperty} from 'tslint/lib/utils';
import {Basket} from '../../../Models/Basket';
import {Product} from '../../../Models/Product';
import {Order} from '../../../Models/Order';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:8080/';
  headers = new HttpHeaders();

  register(eAddress, uName, passW) {
    const params = new FormData();
    params.append('username', uName);
    params.append('password', passW);
    params.append('email', eAddress);
    return this.http.post(this.apiUrl + 'register', params);
  }

  login(uName, passW) {
    return this.http.post(this.apiUrl + 'login', JSON.stringify({usernameEmail: uName, password: passW}), {observe: 'response'});
  }

  getAuthentication(): Observable<User> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<User>(this.apiUrl + 'getAuthentication', {headers});
  }

  confirmRegistration(user) {
    return this.http.get(this.apiUrl + 'enableUser/' + user);
  }

  addUserInfo(userdata: PersonalData) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    const params = new FormData();
    params.append('name', userdata.name);
    params.append('surname', userdata.surname);
    params.append('phoneNumber', userdata.phoneNumber);
    params.append('country', userdata.address.country);
    params.append('city', userdata.address.city);
    params.append('street', userdata.address.street);
    params.append('region', userdata.address.region);
    params.append('number', userdata.address.number);
    // @ts-ignore
    if (userdata.picture != null && userdata.picture.name) {
      // @ts-ignore
      params.append('userPicture', userdata.picture, userdata.picture.name);
    }
    return this.http.post(this.apiUrl + 'addUserData', params, {headers});
  }

  addProductInCart(res: Basket) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + 'addProductsToCart', {product: res.product, quantity: res.quantity}, {headers});
  }

  getAllProductsFromCart(): Observable<Basket[]> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Basket[]>(this.apiUrl + 'getAllProductsFromCart', {headers});
  }

  addProductToWishes(product: Product) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + 'addProductToWishes', product, {headers});
  }

  addProductToCompare(product: Product) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + 'addProductToCompare', product, {headers});
  }

  getAllWishes(): Observable<Product[]> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Product[]>(this.apiUrl + 'getAllWishes', {headers});
  }

  deleteFromBasket(product: Product) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + 'deleteFromBasket/' + product.id, {headers});
  }

  deleteFromWishes(product: Product) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + 'deleteFromWishes/' + product.id, {headers});
  }

  makeOrder(basket: Basket[], user: User, payType: string): Observable<Order> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    const order = new Order(null, basket, 'checking', false, payType, null, null);
    return this.http.post<Order>(this.apiUrl + 'makeOrder', order, {headers});
  }

  getAllUserOrders(): Observable<Order[]> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Order[]>(this.apiUrl + 'getAllOrders', {headers});
  }

  changePassword(oldPas, newPas) {
    const params = new FormData();
    params.append('oldPassword', oldPas);
    params.append('newPassword', newPas);
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + 'changePassword', params, {headers});
  }


  getComparisons(): Observable<Product[]> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Product[]>(this.apiUrl + 'getComparison', {headers});
  }

  deleteFromCompare(product: any) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + 'deleteFromComparison/' + product.id, {headers});
  }
}
