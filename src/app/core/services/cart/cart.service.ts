import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }
  myToken:WritableSignal<string|null>=signal(localStorage.getItem("userToken"))
  cartNum:WritableSignal<number>=signal(0)

  addProductToCart(id:string):Observable<any>
  {
      return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,

        {
           "productId": id
        },
       { headers:{
            token:this.myToken()! 
        }
      }
      )
  }
  removeSpecificCartItem(id:string):Observable<any>
  {
      return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,

       { headers:{
            token:this.myToken()! 
        }
      }
      )
  }
  updateCartProductQuantity(id:string, count:number):Observable<any>
  {
      return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,

        {
          "count": count
        }
        ,
       {
         headers:{
            token:this.myToken()! 
        }
      }
      )
  }


  GetLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`,{
      headers:{
        token:this.myToken()!
    }})
  }


  clearCartItem():Observable<any>
  {
      return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`,

       { headers:{
            token:this.myToken()! 
        }
      }
      )
  }



}
