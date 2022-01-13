import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/share/models/products';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product?: IProduct;

  constructor(private shopService: ShopService, private activeRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+this.activeRout.snapshot.paramMap.get('id')!).subscribe(response => {
     
        this.product = response;
      
      }, error =>{
        console.log(error);
        
      }
    );
  }

}
