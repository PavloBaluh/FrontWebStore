import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ItemsComponent} from '../../Components/items/items.component';
import {HomeComponent} from '../../Components/home/home.component';
import {GoodsComponent} from '../../Components/goods/goods.component';
import {GoodsItemsComponent} from '../../Components/goods-items/goods-items.component';
import {LoginComponent} from '../user/Components/login/login.component';
import {RegisterComponent} from '../user/Components/register/register.component';
import {ConfirmRegistrationComponent} from '../user/Components/confirm-registration/confirm-registration.component';
import {UserMenuComponent} from '../user/Components/user-menu/user-menu.component';
import {UserInfoComponent} from '../user/Components/user-info/user-info-component';
import {BasketComponent} from '../user/Components/basket/basket.component';
import {WishesComponent} from '../user/Components/wishes/wishes.component';
import {CheckoutComponent} from '../user/Components/checkout/checkout.component';
import {InvoiceComponent} from '../user/Components/invoice/invoice.component';
import {PrintComponent} from '../user/Components/print/print.component';
import {OrderComponent} from '../user/Components/order/order.component';
import {GoodComponent} from '../../Components/good/good.component';
import {CompareComponent} from '../user/Components/compare/compare.component';
import {CurrentComparationComponent} from '../user/Components/current-comparation/current-comparation.component';
import {AdminMenuComponent} from '../admin/admin-menu/admin-menu.component';
import {UsersComponent} from '../admin/users/users.component';
import {AdminDataComponent} from '../admin/admin-data/admin-data.component';
import {OrdersComponent} from '../admin/orders/orders.component';
import {ProductTreeComponent} from '../admin/product-tree/product-tree.component';


const routers: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'menu/:element', component: ItemsComponent},
  {
    path: ':name/goods', component: GoodsComponent,
    children: [{path: 'sort', component: GoodsItemsComponent}]
  },
  {path: 'good/:id', component: GoodComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'confirmedRegistration/:username', component: ConfirmRegistrationComponent},
  {
    path: 'userMenu',
    component: UserMenuComponent,
    children: [
      {path: 'userInfo', component: UserInfoComponent},
      {path: 'cart', component: BasketComponent},
      {path: 'wishes', component: WishesComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'invoice', component: InvoiceComponent},
      {path: 'print', component: PrintComponent},
      {path: 'orders', component: OrderComponent},
      {path: 'comparisons', component: CompareComponent},
      {path: 'compare', component: CurrentComparationComponent}
    ]
  },
  {
    path: 'adminMenu',
    component: AdminMenuComponent, children: [
      {path: 'users', component: UsersComponent},
      {path: 'personalData', component: AdminDataComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'productTree', component: ProductTreeComponent}
    ]
  }
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
