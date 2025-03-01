import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient:HttpClient) { }
    myToken:WritableSignal<string|null>=signal(localStorage.getItem("userToken"))

    addProductToWishList(id:string):Observable<any>
      {
          return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
    
            {
               "productId": id
            },
           { headers:{
                token:this.myToken()! 
            }
          }
          )
      }
      removeSpecificWishListItem(id:string):Observable<any>
      {
          return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
    
           { headers:{
                token:this.myToken()! 
            }
          }
          )
      }
      GetLoggedUserWishList():Observable<any>{
        return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`,{
          headers:{
            token:this.myToken()!
        }})
      }
    
   
}
