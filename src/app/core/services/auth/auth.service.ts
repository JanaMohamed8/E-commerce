import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  userToken:any=null;
  private readonly router=inject(Router)

   sendRegisterForm(data:object):Observable<any>
   {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
   }
   sendLoginForm(data:object):Observable<any>
   {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
   }

   decodeUserToken():void{
    if(localStorage.getItem("userToken") !== null)
       this.userToken= jwtDecode(localStorage.getItem("userToken")!);
      console.log(this.userToken)
   }

   logOut():void{
    localStorage.removeItem('userToken')
    this.router.navigate(['/login'])
    this.userToken=null;
   }


   sendVerifyEmail(data:object):Observable<any>
   {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
   }
   
   sendVerifyCode(data:object):Observable<any>
   {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
   }
   sendVerifyNewPass(data:object):Observable<any>
   {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
   }



}


