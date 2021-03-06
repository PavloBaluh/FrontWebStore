import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import {RoutingModule} from '../routing/routing.module';
import { UsersComponent } from './users/users.component';
import {UserModule} from '../user/user.module';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductTreeComponent } from './product-tree/product-tree.component';
import { CurrentTreeComponent } from './current-tree/current-tree.component';
import {FormsModule} from '@angular/forms';
import { ProperiesTreeComponent } from './properies-tree/properies-tree.component';

@NgModule({
  declarations: [AdminMenuComponent, UsersComponent, AdminDataComponent, OrdersComponent, ProductTreeComponent, CurrentTreeComponent, ProperiesTreeComponent],
  imports: [
    CommonModule,
    RoutingModule,
    UserModule,
    FormsModule,
  ]
})
export class AdminModule { }
