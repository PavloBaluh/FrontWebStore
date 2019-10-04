import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from '../../../../Services/data.service';
import {Product} from '../../../../Models/Product';
import {Basket} from '../../../../Models/Basket';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'app-add-to-basket-modal',
  templateUrl: './add-to-basket-modal.component.html',
  styleUrls: ['./add-to-basket-modal.component.css']
})
export class AddToBasketModalComponent implements OnInit {
  @ViewChild('button', {static: true}) button: ElementRef;
  @ViewChild('inp', {static: true}) input: ElementRef;
  @Output() buttonClicked = new EventEmitter();
  product: Product;
  price = 0;
  availability = 0;
  title = '';
  quantity = 0;
  total = 0;
  picture = '';

  constructor(private service: DataService, private userService: UserService) {
  }

  ngOnInit() {
    this.service.ProductChanel.subscribe((res: Product) => {
      this.product = res;
      this.button.nativeElement.style.pointerEvents = 'auto';
      this.button.nativeElement.style.borderColor = 'black';
      this.button.nativeElement.style.color = 'black';
      this.quantity = 1;
      this.picture = res.picture;
      this.price = res.price;
      this.total = this.price;
      this.title = res.title;
      this.availability = res.availableNumber;
      if (this.availability < 1) {
        this.quantity = 0;
        this.total = 0;
        this.button.nativeElement.style.pointerEvents = 'none';
        this.button.nativeElement.style.borderColor = 'grey';
        this.button.nativeElement.style.color = 'grey';
      }
    });
  }

  changeQuantity(value: any) {
    this.quantity = value;
    if (value > 0) {
      this.total = this.price * value;
    }
  }

  addToCard(inp) {
    inp.style.borderColor = '#eaeaea';
    this.buttonClicked.emit(true);
    const basketElem = new Basket(null, this.product, this.quantity);
    this.userService.addProductInCart(basketElem).subscribe((isProductReceived) => {
      if (isProductReceived) {
        this.service.BasketChanel.next(basketElem);
      }
     // this.service.BasketChanel.next({cart: basketElem, plusMinus: 'plus'});
    });
  }
}
