import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<any>
   {
         return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
  getSpecificCategories(Id:string):Observable<any>
   {
         return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${Id}`);
  }

}
