import {Component, OnInit} from '@angular/core';
import {AdminService} from '../Services/admin.service';
import {User} from '../../../Models/User';
import {PersonalData} from '../../../Models/PersonalData';
import {PersonalAddress} from '../../../Models/PersonalAddress';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private service: AdminService) {
  }

  ngOnInit() {
    this.service.getUsers().subscribe((users) => {
      users.forEach((user) => {
        if (user.personalData === null) {
          user.personalData = new PersonalData('', '', '', 'man_user.png', null);
        }
        if (user.personalData.address === null) {
          user.personalData.address = new PersonalAddress();
        }
        if (user.personalData.picture === '') {
          user.personalData.picture = 'man_user.png';
        }

      });
      this.users = users;
      console.log(users);
    });
  }

  change(user: User) {
    this.service.lockUnlockUser(user.id).subscribe((res) => {
      this.users.forEach((el) => {
        if (el.id === res.id) {
          el.accountNonLocked = res.accountNonLocked;
        }
      });
    });
  }
}
