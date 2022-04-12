import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../share/models/basket';
import { IProduct } from '../share/models/products';

@Injectable({
  providedIn: 'root'
})



export class BasketService {

  baseUrl = environment.apiUrl;
  
  basketX: IBasket = {id:'', items: []};

  basketSourceX: IBasketTotals = {shipping:0, subtotal:0, total:0};

  private basketSource = new BehaviorSubject<IBasket>(this.basketX);

  private basketTotalSource = new BehaviorSubject<IBasketTotals>(this.basketSourceX)

//observable use $ sign
  basket$ = this.basketSource.asObservable();
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }


  getBasket(id:string){
    return this.http.get(this.baseUrl + 'basket?id=' +id)
    .pipe(
     map((basket: IBasket) => {
       this.basketSource.next(basket);
       this.calculateTotal();
      //  console.log(this.getCurrentBasketValue());
     })
    );
  }


  setBasket(basket: IBasket){
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) =>{
      this.basketSource.next(response);
      this.calculateTotal();
       //console.log(response);
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity= 1){

   // console.log("******************************")
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    let basket = this.getCurrentBasketValue();
   // console.log("get the current basket :  " + basket.id);
   // let basket: IBasket = this.getCurrentBasketValue() ?? this.createBasket();
    if(basket.id == ''){
      basket = this.createBasket();
      // console.log("creating busket...............-------------99999999");

    }

  //  console.log("--------add item to basket " + basket);
    if(basket.items){
      basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    }
    
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem){

    const basket = this.getCurrentBasketValue();
    let foundItemIndex = basket.items?.findIndex(x => x.id === item.id);
    basket.items![foundItemIndex!].quantity++;
    this.setBasket(basket);
    
  }

  decrementItemQuantity(item: IBasketItem){

    const basket = this.getCurrentBasketValue();
    let foundItemIndex = basket.items?.findIndex(x => x.id === item.id);
    if(basket.items![foundItemIndex!].quantity > 1){
      basket.items![foundItemIndex!].quantity--;
      this.setBasket(basket);
    }else{
      this.removeItemFromBasket(item)
    }
    
    
  }

  removeItemFromBasket(item: IBasketItem) {
      const basket = this.getCurrentBasketValue();
      if(basket.items?.some(x =>x.id ===item.id)){
          basket.items = basket.items.filter(i => i.id !== item.id);
          if(basket.items.length > 0){
            this.setBasket(basket);
          }else{
            this.deleteBasket(basket);
          }
      } 
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(()=>{
        this.basketSource.next(this.basketX);
        this.basketTotalSource.next(this.basketSourceX);
        localStorage.removeItem('basket_id');
      }, error =>{
        console.log(error);
      }
    )
  }


  private calculateTotal(){
    const basket = this.getCurrentBasketValue();
    let shipping = 0;
    const subtotal = basket.items?.reduce((a,b) =>(b.price! * b.quantity) + a, 0);
    const total = subtotal! + shipping!;
    this.basketTotalSource.next({shipping, subtotal, total})
    
  }
  private addOrUpdateItem(items: IBasketItem[] , itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
   // console.log("-------------- " + items)
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else{
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket {
    //console.log("bassssssket");
    const basket = new Basket()
    console.log("create basket ID method: " + basket.id);
    localStorage.setItem('basket_id', basket.id); 
    return basket;
  }
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
   
    return{
     id: item.id,
     productName:item.name,
     price:item.price,
     pictureUrl:item.pictureUrl,
     quantity,
     brand:item.productBrand,
     type:item.productType
   }

  }
}
