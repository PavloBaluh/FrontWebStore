import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainService} from '../../Services/main.service';
import {Category} from '../../Models/Category';
import {SubCategory} from '../../Models/SubCategory';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  elementsToShowAsside: any[] = [];
  menuElements: Category[] = [];
  header = '';
  highlightedElement = null;
  elementsToShowMain: any[] = [];

  constructor(private activatedRouter: ActivatedRoute, private service: MainService, private router: Router) {
  }

  ngOnInit() {
    this.service.getAllCategories().subscribe(res => {
      this.menuElements = res;
      this.findCategories();
    });
  }

  findCategories() {
    this.activatedRouter.params.subscribe(params => {
      const param = params.element;
      this.menuElements.forEach((elOuter) => {
        if (param === elOuter.name) {
          this.showCategories(elOuter);
        } else {
          elOuter.subCategories.forEach((elInner) => {
            if (param === elInner.name) {
              this.showSubCategories(elInner, elOuter.subCategories);
            }

          });
        }
      });
    });
  }

  showCategories(el) {
    this.header = 'Categories';
    this.elementsToShowAsside = this.menuElements;
    this.highlightedElement = el.name;
    this.elementsToShowMain = el.subCategories;
  }

  showSubCategories(el, subCategories) {
    this.header = 'SubCategories';
    this.elementsToShowAsside = subCategories;
    this.highlightedElement = el.name;
    this.elementsToShowMain = el.groups;
  }

  selectElem(elem) {
    console.log(elem);
    this.highlightedElement = elem.name;
    if (elem instanceof Category) {
      this.elementsToShowMain = elem.subCategories;

    }
    if (elem instanceof SubCategory) {
      this.elementsToShowMain = elem.groups;
    }
    this.router.navigate(['menu', elem.name]);
  }
}
