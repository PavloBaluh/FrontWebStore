import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../Models/User';
import {Product} from '../../../Models/Product';
import {Category} from '../../../Models/Category';
import {SubCategory} from '../../../Models/SubCategory';
import {Group} from '../../../Models/Group';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/admin';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
  }


  getUsers(): Observable<User[]> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<User[]>(this.apiUrl + '/gerAllUsers', {headers});
  }

  getOrders() {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get(this.apiUrl + '/getAllOrders', {headers});
  }

  lockUnlockUser(id: number): Observable<User> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<User>(this.apiUrl + '/lockUnlockUser/' + id, {headers});
  }

  changeOrderStatus(value: any, id: any) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get(this.apiUrl + '/changeOrderStatus/' + value + ',' + id, {headers});
  }

  getAllProducts(): Observable<Product[]> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Product[]>(this.apiUrl + '/getAllProducts/', {headers});
  }

  deleteOrder(id: number) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + '/deleteOrderEntity/' + id, {headers});
  }

  renameCategory(category: Category, value: string) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get(this.apiUrl + '/renameCategory/' + (value + ',' + category.id), {headers});
  }

  renameSubCategory(subCategory: SubCategory, value: string) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get(this.apiUrl + '/renameSubCategory/' + (value + ',' + subCategory.id), {headers});
  }

  renameGroup(group: Group, value: string) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get(this.apiUrl + '/renameGroup/' + (value + ',' + group.id), {headers});
  }

  removeCategory(category: Category) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + '/deleteCategory/' + category.id, {headers});
  }

  removeSubCategory(subCategory: SubCategory) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + '/deleteSubCategory/' + subCategory.id, {headers});
  }

  removeGroup(group: Group) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + '/deleteGroup/' + group.id, {headers});
  }

  removeProduct(product: Product) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + '/deleteProduct/' + product.id, {headers});
  }

  addCategory(category: Category): Observable<Category> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post<Category>(this.apiUrl + '/addCategory/' + category.name, {}, {headers});
  }

  addSubCategory(category, subCategory: SubCategory) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + '/addSubCategory/' + subCategory.name, category, {headers});
  }

  addGroup(sub: SubCategory, group: Group) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + '/addGroup/' + group.name, sub, {headers});
  }

  changeProductInfo(product: Product, properties) {
    const params = new FormData();
    params.append('id', product.id.toString());
    params.append('title', product.title);
    params.append('description', product.description);
    params.append('warrantyMonths', product.warrantyMonths.toString());
    params.append('availableNumber', product.availableNumber.toString());
    params.append('price', product.price.toString());
    params.append('groupId', product.group.id.toString());
    params.append('properties', properties);
    // @ts-ignore
    if (product.picture != null && product.picture.name) {
      // @ts-ignore
      params.append('productPicture', product.picture, product.picture.name);
    } else {
      params.append('oldPicture', product.picture);
    }
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + '/changeProductInfo', params, {headers});
  }

  addProduct(group: Group): Observable<Product> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Product>(this.apiUrl + '/addProduct/' + group.id, {headers});
  }
}
