import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Models/User';
import {PersonalData} from '../Models/PersonalData';
import {hasOwnProperty} from 'tslint/lib/utils';
import {Basket} from '../Models/Basket';


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
    return this.http.get<User>(this.apiUrl + 'getAuthentication', {headers: headers});
  }

  confirmRegistration(user) {
    return this.http.get(this.apiUrl + 'enableUser/' + user);
  }

  addUserInfo(userdata: PersonalData) {
    console.log(userdata);
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
    return this.http.post(this.apiUrl + 'addUserData', params, {headers: headers});
  }

  addProductInCart(res: Basket) {
    console.log(res);
  }
}
