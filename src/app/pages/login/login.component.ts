import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  private readonly formBuilder=inject(FormBuilder)
  isLogin:WritableSignal<boolean>=signal(false)
  msgError:WritableSignal<string>=signal('')
  createdAcc:WritableSignal<string>=signal('')
  unSub:Subscription=new Subscription();


  loginForm:FormGroup=this.formBuilder.group({
    email:[null,[Validators.required ,Validators.email]],
    password:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)]]
  })


  //  loginForm:FormGroup =new FormGroup({
  //    email: new FormControl(null,[Validators.required ,Validators.email]),
  //    password: new FormControl(null,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
  //  })

   //call api
   submitForm(): void {
    if(this.loginForm.valid){
       this.isLogin.set(true);
      this.unSub= this.authService.sendLoginForm(this.loginForm.value).subscribe({
         next:(res)=>{
           //navigate home
           this.isLogin.set(false);
            //take token -->local storage
            localStorage.setItem("userToken",res.token)
            //save user token -->save at userToken property at service
            this.authService.decodeUserToken()
          setTimeout(() => {
           this.router.navigate(['/home']);
          }, 700);
           this.createdAcc.set(res.message);

           console.log(res);
           this.msgError.set('');
         },
         error:(err)=>{
           //show error
           this.isLogin.set(false);
           this.msgError.set(err.error.message);
           console.log(err);
         }
       })
    }else{
      this.loginForm.markAllAsTouched();
    }
   }

   ngOnDestroy(): void {
    this.unSub.unsubscribe();
   
}


   
}
