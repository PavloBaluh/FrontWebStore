import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemsComponent} from '../../Components/items/items.component';
import {HomeComponent} from '../../Components/home/home.component';
import {GoodsComponent} from '../../Components/goods/goods.component';
import {GoodsItemsComponent} from '../../Components/goods-items/goods-items.component';
import {LoginComponent} from '../user/Components/login/login.component';
import {RegisterComponent} from '../user/Components/register/register.component';
import * as path from 'path';
import {ConfirmRegistrationComponent} from '../user/Components/confirm-registration/confirm-registration.component';
import {UserMenuComponent} from '../user/Components/user-menu/user-menu.component';
import {UserInfoComponent} from '../user/Components/user-info/user-info-component';


const routers: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'menu/:element', component: ItemsComponent},
  {
    path: ':name/goods', component: GoodsComponent,
    children: [{path: 'sort', component: GoodsItemsComponent}]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'confirmedRegistration/:username', component: ConfirmRegistrationComponent},
  {path: 'userMenu', component: UserMenuComponent, children: [{path: 'userInfo', component: UserInfoComponent}]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routers)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule {
}
