import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../../../services/products-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.scss']
})
export class RemoveProductComponent implements OnInit {
  productList: Observable<Array<any>>
  showSpinner: boolean = true;
  onHover: boolean = false;
  constructor(
    private _productService: ProductsListService
  ) { }

  getProductsArr(){
    this._productService.getProducts().subscribe(res => {
      console.log(res)
      this.showSpinner = false; 
      this.productList = res;
    });
  }

  ngOnInit() {
    this.getProductsArr();
  }
  
  filterItem(phrase) {
  this.getProductsArr();
    this.productList = this._productService.findProduct(phrase, this.productList);
  }
  

}
