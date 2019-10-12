import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../../Models/Product';
import {Basket} from '../../../../Models/Basket';
import {UserService} from '../../Services/user.service';
import {PersonalData} from '../../../../Models/PersonalData';
import {PersonalAddress} from '../../../../Models/PersonalAddress';
import {User} from '../../../../Models/User';
import {DataService} from '../../../../Services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  product: Basket[] = [];
  total = 0;
  formObj = {
    email: '',
    personalData: new PersonalData('', '', '', null,
      new PersonalAddress('', '', '', '', ''))
  };

  constructor(private service: UserService, private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    this.service.getAuthentication().subscribe((user: User) => {
      this.formObj.personalData = user.personalData;
      this.formObj.email = user.email;
      this.service.getAllProductsFromCart().subscribe((res) => {
        if (res != null && res.length > 0) {
          this.product = res;
          res.forEach((el) => {
            this.total += el.product.price * el.quantity;
          });
        }
      });
    });
  }

  placeOrder(inp: HTMLInputElement, inp1: HTMLInputElement) {
    let checked = '';
    if (inp.checked) {
      checked = 'cash';
    } else {
      checked = 'payPal';
    }
    // @ts-ignore
    this.service.makeOrder(this.product, this.formObj, inp1.value).subscribe((order) => {
      this.dataService.AllBasketChanel.next(null);
      this.router.navigate(['userMenu/invoice'], {
        queryParams: {
          pay: checked,
          form: JSON.stringify(this.formObj),
          order: JSON.stringify(order)
        }
      });
    });
  }
}
