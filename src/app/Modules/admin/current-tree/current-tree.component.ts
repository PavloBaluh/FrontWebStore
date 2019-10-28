import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AdminDataService} from '../Services/admin-data.service';
import {Category} from '../../../Models/Category';
import {Group} from '../../../Models/Group';
import {SubCategory} from '../../../Models/SubCategory';
import {AdminService} from '../Services/admin.service';
import {Product} from '../../../Models/Product';
import {PropertyValue} from '../../../Models/PropertyValue';
import {MainService} from '../../../Services/main.service';

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

  formObj = {
    id: 0,
    title: '',
    price: 0,
    availableNumber: 0,
    category: '',
    subCategory: '',
    group: '',
    description: '',
    properties: [],
    warrantyMonths: 0,
    picture: ''
  };
  categories: Category[];
  subCategories: SubCategory[];
  groups: Group[];
  properties: [];
  IsEdited = false;


  constructor(private adminDataService: AdminDataService, private adminService: AdminService, private service: MainService) {
  }

  ngOnInit() {
    this.adminDataService.treeCategoryChanel.subscribe((res: Category) => {
      this.category = res;
      this.type = 'Category';
      this.nextType = 'SubCategory';
      this.placeholder = res.name;
      this.categoriesChange = true;
      this.isProduct = false;
    });
    this.adminDataService.treeSubChanel.subscribe((res: SubCategory) => {
      this.subCategory = res;
      this.type = 'Subcategory';
      this.nextType = 'Group';
      this.placeholder = res.name;
      this.categoriesChange = true;
      this.isProduct = false;
    });
    this.adminDataService.treeGroupChanel.subscribe((res: Group) => {
      this.group = res;
      this.type = 'Group';
      this.nextType = 'Product';
      this.placeholder = res.name;
      this.categoriesChange = true;
      this.isProduct = false;
    });

    this.adminDataService.showchanel.subscribe((res: boolean) => {
      this.categoriesChange = res;
    });

    this.adminDataService.productChanel.subscribe((product: Product) => {
      if (product.id !== this.formObj.id) {
        // @ts-ignore
        this.formObj = product;
        this.formObj.properties = [];
        product.propertyValues.forEach((prop) => {
          this.formObj.properties.push(prop.value);
        });
        this.service.getHierarchy(product.group).subscribe((hier) => {
          this.formObj.category = hier[2];
          this.formObj.subCategory = hier[1];
          this.formObj.group = hier[0];
          this.service.getAllCategories().subscribe((res: Category[]) => {
            this.categories = res;
            res.forEach((category) => {
              if (category.name === this.formObj.category) {
                this.subCategories = category.subCategories;
                this.subCategories.forEach((sub) => {
                  if (sub.name === this.formObj.subCategory) {
                    this.groups = sub.groups;
                  }
                });
              }
            });
          });
        });
      }
      this.categoriesChange = false;
      this.isProduct = true;
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

  uploadFile(files, imginp) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = reader.result;
      imginp.src = img;
    };
    reader.readAsDataURL(files.item(0));
    this.formObj.picture = files.item(0);
  }

  changeCategory(val) {
    this.formObj.category = val;
    this.categories.forEach((ct) => {
      if (ct.name === this.formObj.category) {
        this.subCategories = ct.subCategories;
        this.formObj.subCategory = this.subCategories[0].name;
        ct.subCategories.forEach((sub) => {
          if (sub.name === this.formObj.subCategory) {
            this.groups = sub.groups;
            this.formObj.group = this.groups[0].name;
          }
        });
      }
    });
  }

  changeSubCategory(value: string) {
    this.formObj.subCategory = value;
    this.subCategories.forEach((sub) => {
      if (sub.name === value) {
        this.groups = sub.groups;
        this.formObj.group = sub.groups[0].name;
      }
    });

  }

  changeGroup(value: string) {
    this.formObj.group = value;
  }

  change() {
    const product: Product = new Product(0, '', '', 0, 0, '', 0, 0, new Group(), new SubCategory());
    product.id = this.formObj.id;
    product.title = this.formObj.title;
    product.price = this.formObj.price;
    product.availableNumber = this.formObj.availableNumber;
    product.warrantyMonths = this.formObj.warrantyMonths;
    product.description = this.formObj.description;
    product.picture = this.formObj.picture;
    this.categories.forEach((category) => {
      if (category.name === this.formObj.category) {
        category.subCategories.forEach((sub: SubCategory) => {
          if (sub.name === this.formObj.subCategory) {
            sub.groups.forEach((group) => {
              if (group.name === this.formObj.group) {
                product.group = group;
              }
            });
          }
        });
      }
    });
    this.adminService.changeProductInfo(product, this.formObj.properties).subscribe((res) => {
      this.IsEdited = true;
      setTimeout(() => this.IsEdited = false, 2000);
    });
  }
}
