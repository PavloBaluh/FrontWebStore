import {Component, Input, OnInit} from '@angular/core';
import {SubCategory} from '../../Models/SubCategory';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../../Models/Group';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {
  @Input() elementsToShowMain;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  show(el) {
    if (el.hasOwnProperty('groups')) {
      this.router.navigate(['menu', el.name]);
    } else {
      this.router.navigate([el.name + '/goods']);
    }
  }
}
