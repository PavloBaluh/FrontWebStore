import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../../Models/Product';
import {MainService} from '../../../../Services/main.service';
import {Property} from '../../../../Models/Property';

@Component({
  selector: 'app-current-comparation',
  templateUrl: './current-comparation.component.html',
  styleUrls: ['./current-comparation.component.css']
})
export class CurrentComparationComponent implements OnInit {
  products: Product[];
  props: Property[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: MainService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.products = JSON.parse(params.Products);
      this.products.forEach((prod) => {
        prod.propertyValues.reverse();
      });
      this.service.getAllProperties(params.sub).subscribe((res: Property[]) => {
        this.props = res;
      });
    });
  }


}
