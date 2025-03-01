import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

   myToken:WritableSignal<string|null>=signal(localStorage.getItem("userToken"))

    sendOnlineOrder(cartId:string,formData:object):Observable<any>{
      return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
        {
          "shippingAddress":formData
        }
        ,
        {
          headers:{
                token:this.myToken()!
          }
        }
      )
    }

      
}
