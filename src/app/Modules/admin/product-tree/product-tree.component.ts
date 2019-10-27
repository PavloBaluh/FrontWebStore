import {Component, OnInit} from '@angular/core';
import {AdminService} from '../Services/admin.service';
import {UserService} from '../../user/Services/user.service';
import {MainService} from '../../../Services/main.service';
import {SubCategory} from '../../../Models/SubCategory';
import {Group} from '../../../Models/Group';
import {Category} from '../../../Models/Category';
import {AdminDataService} from '../Services/admin-data.service';
import {Product} from '../../../Models/Product';

@Component({
  selector: 'app-product-tree',
  templateUrl: './product-tree.component.html',
  styleUrls: ['./product-tree.component.css']
})
export class ProductTreeComponent implements OnInit {

  categories: Category[] = [];
  componentToDelete;

  constructor(private adminService: AdminService, private menuService: MainService, private adminDataService: AdminDataService) {
  }

  ngOnInit() {
    this.adminService.getAllProducts().subscribe((products) => {
      this.menuService.getAllCategories().subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categories.forEach((category) => {
          category.subCategories.forEach((subCategory: SubCategory) => {
            subCategory.groups.forEach((group: Group) => {
              if (group.products === undefined) {
                group.products = [];
              }
              products.forEach((product) => {
                if (product.group.name === group.name) {
                  group.products.push(product);
                }
              });
            });
          });
        });
        this.categories = categories;
      });
    });
  }

  wrap(sub: HTMLDivElement) {
    console.log(sub.style.display);
    if (sub.style.display === 'block') {
      sub.style.display = 'none';
    } else {
      sub.style.display = 'block';
    }
  }

  editCategory(category: Category) {
    this.adminDataService.treeCategoryChanel.next(category);
  }

  editSubCategory(sub: SubCategory) {
    this.adminDataService.treeSubChanel.next(sub);
  }

  editGroupCategory(group: Group) {
    this.adminDataService.treeGroupChanel.next(group);
  }

  reload() {
    this.adminDataService.showchanel.next(false);
    this.ngOnInit();
  }

  removeCategory(category: Category) {
    this.adminService.removeCategory(category).subscribe((res) => {
      this.reload();
    });
  }

  removeSubCategory(sub: SubCategory) {
    this.adminService.removeSubCategory(sub).subscribe((res) => {
      this.reload();
    });
  }

  removeGroup(group: Group) {
    this.adminService.removeGroup(group).subscribe((res) => {
    });
    this.reload();
  }

  removeProduct(product: Product) {
    this.adminService.removeProduct(product).subscribe((res) => {
      this.reload();
    });
  }


  showModal(modal: HTMLDivElement, el) {
    this.componentToDelete = el;
    modal.style.display = 'block';
  }

  remove(modale: HTMLDivElement) {
    const el = this.componentToDelete;
    console.log(el);
    if (el.hasOwnProperty('subCategories')) {
      this.removeCategory(el);
    }
    if (el.hasOwnProperty('groups')) {
      this.removeSubCategory(el);
    }
    if (el.hasOwnProperty('products')) {
      this.removeGroup(el);
    }
    if (el.hasOwnProperty('title')) {
      this.removeProduct(el);
    }
    modale.style.display = 'none';
  }

  addSubCategory(category: Category) {
    this.adminService.addSubCategory(category, new SubCategory(null, 'default', null)).subscribe((res: SubCategory) => {
      this.categories.forEach((ct) => {
        if (ct.name === category.name) {
          ct.subCategories.push(res);
        }
      });
    });
  }

  addCategory() {
    this.adminService.addCategory(new Category(null, 'default', null)).subscribe((category: Category) => {
      this.categories.push(category);
    });
  }

  addGroup(sub: SubCategory) {
    this.adminService.addGroup(sub, new Group(null, 'default', null, [])).subscribe((res: Group) => {
      this.categories.forEach((ct) => {
        ct.subCategories.forEach((subCt: SubCategory) => {
          if (subCt.name === sub.name) {
            res.products = [];
            subCt.groups.push(res);
          }
        });
      });
    });
  }

  showProduct(product: Product) {
    this.adminDataService.productChanel.next(product);
  }
}
