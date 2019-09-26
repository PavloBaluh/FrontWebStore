import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ItemsComponent} from './Components/items/items.component';
import {HomeComponent} from './Components/home/home.component';
import {CategoriesMenuComponent} from './Components/categories-menu/categories-menu.component';
import {GoodsComponent} from './Components/goods/goods.component';
import {GoodsItemsComponent} from './Components/goods-items/goods-items.component';
import { JquaryRangeSliderComponent } from './Components/jquary-range-slider/jquary-range-slider.component';
import {RoutingModule} from './Modules/routing/routing.module';
import {UserModule} from './Modules/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    HomeComponent,
    CategoriesMenuComponent,
    GoodsComponent,
    GoodsItemsComponent,
    JquaryRangeSliderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
