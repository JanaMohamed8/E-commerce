import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {


  private readonly formBuilder=inject(FormBuilder)
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  step:WritableSignal<number>=signal(1)
   isLogin:WritableSignal<boolean>=signal(false)
     msgError:WritableSignal<string>=signal('')
     createdAcc:WritableSignal<string>=signal('')
     unSub:Subscription=new Subscription();


  verifyEmail: FormGroup = this.formBuilder.group({
     email:[null,[Validators.required ,Validators.email]],
    })
  verifyCode: FormGroup = this.formBuilder.group({
     resetCode:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)]],//pass
    })
  verifyNewPass: FormGroup = this.formBuilder.group({
   email:[null,[Validators.required ,Validators.email]],
   newPassword:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)]],
    })



   

   submitEmail(): void {
      if(this.verifyEmail.valid){
        this.isLogin.set(true);
           this.authService.sendVerifyEmail(this.verifyEmail.value).subscribe({
            next:(res)=>{
             console.log(res)
             this.createdAcc.set(res.message);
             this.isLogin.set(false);
             this.msgError.set('');
             setTimeout(() => {
              this.step.set(2)
              this.createdAcc.set('');
             }, 700);
            },
            error:(err)=>{
              this.isLogin.set(false);
              this.msgError.set(err.error.message);
              console.log(err)
            }
           })
      }else{
       this.verifyEmail.markAllAsTouched();
      }
      

     }


   submitCode(): void {
      if(this.verifyCode.valid){
        this.isLogin.set(true);
           this.authService.sendVerifyCode(this.verifyCode.value).subscribe({
            next:(res)=>{
             console.log(res)
             this.createdAcc.set(res.status);
             this.isLogin.set(false);
             this.msgError.set('');
             setTimeout(() => {
              this.step.set(3)
              this.createdAcc.set('');
             }, 700);
            },
            error:(err)=>{
              this.isLogin.set(false);
              this.msgError.set(err.error.message);
              this.createdAcc.set('');
              console.log(err)
            }
           })
      }else{
       this.verifyCode.markAllAsTouched();
      }

     }

   submitNewPass(): void {
      if(this.verifyNewPass.valid){
        this.isLogin.set(true);
           this.authService.sendVerifyNewPass(this.verifyNewPass.value).subscribe({
            next:(res)=>{
             console.log(res)
             this.createdAcc.set(res.status);
             this.isLogin.set(false);
             this.msgError.set('');
             setTimeout(() => {
                this.router.navigate(["/home"]);
                localStorage.setItem("userToken", res.token);
                this.authService.decodeUserToken()
             }, 700);
            },
            error:(err)=>{
              this.isLogin.set(false);
              this.msgError.set(err.error.message);
              this.createdAcc.set('');
              console.log(err)
            }
           })
      }else{
       this.verifyNewPass.markAllAsTouched();
      }

     }
   
}
