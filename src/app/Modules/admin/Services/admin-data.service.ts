import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  treeCategoryChanel = new Subject();
  treeSubChanel = new Subject();
  treeGroupChanel = new Subject();
  showchanel = new Subject();
  productChanel = new Subject();

  constructor() {
  }
}
