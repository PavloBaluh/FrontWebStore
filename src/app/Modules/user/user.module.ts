import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './Components/login/login.component';
import {RegisterComponent} from './Components/register/register.component';
import {ConfirmRegistrationComponent} from './Components/confirm-registration/confirm-registration.component';
import {AddToBasketModalComponent} from './Components/add-to-basket-modal/add-to-basket-modal.component';
import {UserMenuComponent} from './Components/user-menu/user-menu.component';
import {UserInfoComponent} from './Components/user-info/user-info-component';
import {RoutingModule} from '../routing/routing.module';
import {FormsModule} from '@angular/forms';
import {WishesComponent} from './Components/wishes/wishes.component';
import {UserService} from './Services/user.service';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { InvoiceComponent } from './Components/invoice/invoice.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ConfirmRegistrationComponent,
    AddToBasketModalComponent, UserMenuComponent, UserInfoComponent, WishesComponent, CheckoutComponent, InvoiceComponent],
  imports: [
    FormsModule,
    RoutingModule,
    CommonModule
  ],
  exports: [LoginComponent, AddToBasketModalComponent]
})
export class UserModule {
}
