import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/Services/user.service';
import {Router} from '@angular/router';
import {DataService} from '../../../Services/data.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private  service: DataService) {
  }

  ngOnInit() {
    // this.router.navigate(['adminMenu/personalData']);
  }

  logout() {
    this.router.navigate(['']);
    localStorage.setItem('_key_', '');
    this.service.UserAucentication.next('none');
  }

}
