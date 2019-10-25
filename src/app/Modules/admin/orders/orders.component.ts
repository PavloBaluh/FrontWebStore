import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../Services/admin.service';
import {Order} from '../../../Models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @ViewChild('select', {static: true}) select: ElementRef;

  orders: Order[] = [];
  currentOrder: Order;
  showMore = false;


  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getOrders().subscribe((orders: []) => {
      console.log(orders);
      for (const order of orders) {
        // @ts-ignore
        const tmp: Order[] = order.orderEntities;
        tmp.forEach((el) => {
          // @ts-ignore
          el.user = order.orderUser;
          this.orders.push(el);
        });
      }
      console.log(this.orders);
    });
  }

  changeOrderStatus(select, id) {
    this.adminService.changeOrderStatus(select.value, id).subscribe(() => {
    });
  }

  deleteOrder(order: Order) {
    event.stopPropagation();
    this.adminService.deleteOrder(order.id).subscribe((res) => {
      if (res === true) {
        this.orders.splice(this.orders.indexOf(order), 1);
      }
    });
  }

  moreInfo(order: Order) {
    this.currentOrder = order;
    this.showMore = true;
  }
}
