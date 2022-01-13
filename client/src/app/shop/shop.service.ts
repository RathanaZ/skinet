import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../share/models/brand';
import { IPagination } from '../share/models/pagination';
import { IType } from '../share/models/productType';
import {map} from 'rxjs/operators';
import { ShopParams } from '../share/models/shopParams';
import { IProduct } from '../share/models/products';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  baseUrl = 'https://localhost:5001/api/';



  constructor(private http: HttpClient) { }



  //getProducts(brandId?:number, typeId?:number, sort?: string){
    getProducts(shopParams: ShopParams){

    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId', shopParams.brandId?.toString() || 'default-token');
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId?.toString() || 'default-token');
    }

    if(shopParams.sort){
      params = params.append('sort', shopParams.sort as string);
      params = params.append('pageIndex', shopParams.pageNumber?.toString() as string);
      params = params.append('pageIndex', shopParams.pageSize?.toString() as string);
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
        .pipe(
          map(response => {
            
            // console.log(response.body);
            return response.body;
          
          })
        );
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }


  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

}
