import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {User} from '../../../../Models/User';
import {PersonalData} from '../../../../Models/PersonalData';
import {DataService} from '../../../../Services/data.service';
import {Order} from '../../../../Models/Order';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  date: Date = new Date();
  user: User = new User(0, '', '', '', new PersonalData());
  order: Order;
  payType = '';
  total = 0;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.user = JSON.parse(res.form);
      this.order = JSON.parse(res.order);
      this.payType = res.pay;
      this.order.orderProducts.forEach((or) => {
        this.total += (or.product.price * or.quantity);
      });
    });
  }

  print() {
    this.router.navigate(['userMenu/print'], {
      queryParams: {
        order: JSON.stringify(this.order),
        user: JSON.stringify(this.user), pay: this.payType
      }
    });
  }
}
