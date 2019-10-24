import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import {RoutingModule} from '../routing/routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AdminMenuComponent, UsersComponent],
  imports: [
    CommonModule,
    RoutingModule,
  ]
})
export class AdminModule { }
