import {Component, OnInit} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {Product} from '../../../../Models/Product';
import {MainService} from '../../../../Services/main.service';
import {SubCategory} from '../../../../Models/SubCategory';
import {DataService} from '../../../../Services/data.service';
import {Basket} from '../../../../Models/Basket';
import {Router} from '@angular/router';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  isDataNotPresent = false;
  isDataPresent = false;
  products: Product[];
  arr = [];

  constructor(private userService: UserService, private mainService: MainService, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getComparisons().subscribe((res: Product[]) => {
      console.log(res);
      if (res === null || res.length === 0) {
        this.isDataNotPresent = true;
        this.isDataPresent = false;
      } else {
        this.mainService.getAllCategories().subscribe((categories) => {
          categories.forEach((category) => {
            category.subCategories.forEach((sub: SubCategory) => {
              this.arr.push({subCategory: sub.name, products: []});
              sub.groups.forEach((group) => {
                res.forEach((product) => {
                  if (product.group.name === group.name) {
                    product.subCategory = sub;
                  }
                });
              });
            });
          });
          this.products = res;
          this.products.forEach((product) => {
            this.arr.forEach((arrEl) => {
              if (arrEl.subCategory === product.subCategory.name) {
                arrEl.products.push(product);
              }
            });
          });
          this.arr = this.arr.filter((el) => {
            return el.products.length > 0;
          });
        });
        this.isDataNotPresent = false;
        this.isDataPresent = true;
      }
    });
  }

  deleteEl(product: any, event: Event) {
    event.stopPropagation();

    this.userService.deleteFromCompare(product).subscribe((res) => {
      if (res === true) {
        this.dataService.CompareChanel.next(false);
        this.arr.forEach((el) => {
          el.products = el.products.filter((pr) => {
            return pr.id !== product.id;
          });
        });
        this.arr = this.arr.filter((el) => {
          return el.products.length !== 0;
        });
      }
      if (this.arr.length === 0) {
        this.isDataNotPresent = true;
        this.isDataPresent = false;
      }
    });
  }

  compare(products) {
    this.router.navigate(['userMenu/compare'], {queryParams: {Products: JSON.stringify(products.products), sub: products.subCategory}});
  }
}
