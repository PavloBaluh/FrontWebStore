import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../Models/User';
import {Product} from '../../../Models/Product';
import {Category} from '../../../Models/Category';
import {SubCategory} from '../../../Models/SubCategory';
import {Group} from '../../../Models/Group';
import {Property} from '../../../Models/Property';
import {PropertyValue} from '../../../Models/PropertyValue';

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

  editSubCategory(subCategory: SubCategory, value: string, picture) {
    const params = new FormData();
    if (picture || picture !== '') {
      console.log(picture.picture);
      params.append('picture', picture, picture.name);
    }
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + '/editSubCategory/' + (value + ',' + subCategory.id), params, {headers});
  }

  editGroup(group: Group, value: string, picture) {
    const params = new FormData();
    if (picture || picture !== '') {
      console.log(picture);
      params.append('picture', picture, picture.name);
    }
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.post(this.apiUrl + '/editGroup/' + (value + ',' + group.id), params, {headers});
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
    console.log(product.id);
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

  getAllProperties(): Observable<Property[]> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Property[]>(this.apiUrl + '/getAllProperties', {headers});
  }

  addProperty(): Observable<Property> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Property>(this.apiUrl + '/addProperty', {headers});
  }

  renameProperty(currentProperty: Property, value: string) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Property>(this.apiUrl + '/renameProperty/' + value + ',' + currentProperty.id, {headers});
  }

  removeProperty(propertySelected: Property) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + '/deleteProperty/' + propertySelected.id, {headers});
  }

  addPropertyValue(property: Property) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get(this.apiUrl + '/addPropertyValue/' + property.id, {headers});
  }

  renamePropertyValue(currentProperty: PropertyValue, value: string) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<Property>(this.apiUrl + '/renamePropertyValue/' + value + ',' + currentProperty.id, {headers});
  }

  removePropertyValue(currrentPropertyValue: PropertyValue) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + '/deletePropertyValue/' + currrentPropertyValue.id, {headers});
  }
}
