import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/share/models/products';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product?: IProduct;

  constructor(private shopService: ShopService, 
              private activeRout: ActivatedRoute,
                private bcService: BreadcrumbService) { 
                    this.bcService.set('@productDetails', '')
                }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+this.activeRout.snapshot.paramMap.get('id')!).subscribe(response => {
     
        this.product = response;
        this.bcService.set('@productDetails', this.product.name);
      
      }, error =>{
        console.log(error);
        
      }
    );
  }

}
