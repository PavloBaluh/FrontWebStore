import {Component, OnInit} from '@angular/core';
import {UserService} from '../../Services/user.service';
import {MainService} from '../../../../Services/main.service';
import {Product} from '../../../../Models/Product';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.css']
})
export class WishesComponent implements OnInit {
  goodsToShow: Product[] = [];

  constructor(private service: MainService) {
  }

  ngOnInit() {
    this.service.getAllGoodsByGroup('For business').subscribe((res) => {
      this.goodsToShow = res;
    });


  }

}
