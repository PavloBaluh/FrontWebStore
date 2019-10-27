import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AdminDataService} from '../Services/admin-data.service';
import {Category} from '../../../Models/Category';
import {Group} from '../../../Models/Group';
import {SubCategory} from '../../../Models/SubCategory';
import {AdminService} from '../Services/admin.service';
import {Product} from '../../../Models/Product';

@Component({
  selector: 'app-current-tree',
  templateUrl: './current-tree.component.html',
  styleUrls: ['./current-tree.component.css']
})
export class CurrentTreeComponent implements OnInit {
  type = '';
  nextType = '';
  placeholder = '';
  categoriesChange = false;
  isProduct = false;
  product: Product;
  category: Category;
  subCategory: SubCategory;
  group: Group;


  constructor(private adminDataService: AdminDataService, private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminDataService.treeCategoryChanel.subscribe((res: Category) => {
      this.category = res;
      this.type = 'Category';
      this.nextType = 'SubCategory';
      this.placeholder = res.name;
      this.categoriesChange = true;
    });
    this.adminDataService.treeSubChanel.subscribe((res: SubCategory) => {
      this.subCategory = res;
      this.type = 'Subcategory';
      this.nextType = 'Group';
      this.placeholder = res.name;
      this.categoriesChange = true;
    });
    this.adminDataService.treeGroupChanel.subscribe((res: Group) => {
      this.group = res;
      this.type = 'Group';
      this.nextType = 'Product';
      this.placeholder = res.name;
      this.categoriesChange = true;
    });

    this.adminDataService.showchanel.subscribe((res: boolean) => {
      this.categoriesChange = res;
    });

    this.adminDataService.productChanel.subscribe((product) => {
      console.log(product);
    });
  }

  changeName(value: HTMLInputElement) {
    const regExpUsername = new RegExp('\\w[A-Za-z0-9]{1,12}');
    if (regExpUsername.test(value.value)) {
      if (this.type === 'Category') {
        this.adminService.renameCategory(this.category, value.value).subscribe((res) => {
          if (res === true) {
            this.placeholder = value.value;
            value.value = '';
          }
        });
      }
      if (this.type === 'Subcategory') {
        this.adminService.renameSubCategory(this.subCategory, value.value).subscribe((res) => {
          if (res === true) {
            this.placeholder = value.value;
            value.value = '';
          }
        });
      }
      if (this.type === 'Group') {
        this.adminService.renameGroup(this.group, value.value).subscribe((res) => {
          if (res === true) {
            this.placeholder = value.value;
            value.value = '';
          }
        });
      }
    }
  }

  remove(modale: HTMLDivElement) {
    if (this.type === 'Category') {
      this.adminService.removeCategory(this.category).subscribe((res) => {
        this.categoriesChange = false;
        modale.style.display = 'none';
      });
    }
    if (this.type === 'Subcategory') {
      this.adminService.removeSubCategory(this.subCategory).subscribe((res) => {
        this.categoriesChange = false;
        modale.style.display = 'none';
      });
    }
    if (this.type === 'Group') {
      this.adminService.removeGroup(this.group).subscribe((res) => {
        this.categoriesChange = false;
        modale.style.display = 'none';
      });
    }
  }
}
