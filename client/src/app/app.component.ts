import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent  implements OnInit{

  title = 'SkiNet';



  constructor(private basketService: BasketService){ }
  

  ngOnInit(): void {
    
    const basketId = localStorage.getItem('basket_id');
    console.log("basket id on app root : " + basketId);
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialized basket');
      }, error => {
        console.log(error);
      });
    }
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 5000);
   
  }
  

}
