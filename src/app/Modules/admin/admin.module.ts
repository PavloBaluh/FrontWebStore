import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import {RoutingModule} from '../routing/routing.module';
import { UsersComponent } from './users/users.component';
import {UserModule} from '../user/user.module';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [AdminMenuComponent, UsersComponent, AdminDataComponent, OrdersComponent],
  imports: [
    CommonModule,
    RoutingModule,
    UserModule
  ]
})
export class AdminModule { }
