import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../../Services/data.service';
import {UserService} from '../../Services/user.service';
import {User} from '../../../../Models/User';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private  service: DataService) {
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['']);
    localStorage.setItem('_key_', '');
    this.service.UserAucentication.next('none');
  }
}
