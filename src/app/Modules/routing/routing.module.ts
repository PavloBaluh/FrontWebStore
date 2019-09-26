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


const routers: Routes = [
  {path: '', component: HomeComponent},
  {path: 'menu/:element', component: ItemsComponent},
  {
    path: ':name/goods', component: GoodsComponent,
    children: [{path: 'sort', component: GoodsItemsComponent}]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'confirmedRegistration/:username', component: RegisterComponent}
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
