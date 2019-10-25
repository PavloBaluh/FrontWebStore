import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/admin';
  headers = new HttpHeaders();
  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<User[]>(this.apiUrl + '/gerAllUsers', {headers});
  }

  getOrders() {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get(this.apiUrl + '/getAllOrders', {headers});
  }

  lockUnlockUser(id: number): Observable<User>  {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get<User>(this.apiUrl + '/lockUnlockUser/' + id, {headers});
  }

  changeOrderStatus(value: any, id: any) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.get(this.apiUrl + '/changeOrderStatus/' + value + ',' + id, {headers});
  }

  deleteOrder(id: number) {
    const headers = this.headers.append('Authorization', localStorage.getItem('_key_'));
    return this.http.delete(this.apiUrl + '/deleteOrderEntity/' + id, {headers});
  }
}
