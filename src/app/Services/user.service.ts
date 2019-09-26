import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Models/User';


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
    const header = this.headers.append('Authorization', localStorage.getItem('_key_'));
    console.log(header);
    return this.http.get<User>(this.apiUrl + 'getAuthentication', {headers: header});
  }

}
