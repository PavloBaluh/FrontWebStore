import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {User} from '../../../../Models/User';
import {PersonalData} from '../../../../Models/PersonalData';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  date: Date = new Date();
  user: User = new User('', '', '', new PersonalData());

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.user = JSON.parse(res.form);
    });
  }

}
