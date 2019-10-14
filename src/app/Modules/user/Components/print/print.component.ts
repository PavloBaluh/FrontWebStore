import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../../Models/User';
import {PersonalData} from '../../../../Models/PersonalData';
import {Order} from '../../../../Models/Order';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  @ViewChild('toPrint', {static: true}) toPrint: ElementRef;
  date: Date = new Date();
  user: User = new User('', '', '', new PersonalData());
  order: Order;
  payType = '';
  total = 0;

  constructor(private  activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.user = JSON.parse(res.user);
      this.order = JSON.parse(res.order);
      this.payType = res.pay;
      this.order.orderProducts.forEach((or) => {
        this.total += (or.product.price * or.quantity);
      });
      document.body.style.visibility = 'hidden';
      this.toPrint.nativeElement.style.visibility = 'visible';
      setTimeout(() => {
        window.print();
      }, 1000);
    });
  }

}
