import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

   private readonly authService=inject(AuthService)
   private readonly formBuilder=inject(FormBuilder)
   private readonly router=inject(Router)
   isLogin:WritableSignal<boolean>=signal(false)
   msgError:WritableSignal<string>=signal('')
   createdAcc:WritableSignal<string>=signal('')
   unSub:Subscription=new Subscription();


   registerForm: FormGroup = this.formBuilder.group({

    name: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required ,Validators.email]],
      password:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)]],
      rePassword:[null,[Validators.required]],
      phone:[null,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]],

   },{validators:this.confirmPass})


    // registerForm: FormGroup =new FormGroup({
    //   name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)] ),
    //   email: new FormControl(null,[Validators.required ,Validators.email]),
    //   password: new FormControl(null,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
    //   rePassword: new FormControl(null,[Validators.required]),
    //   phone: new FormControl(null,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    // }, {validators:this.confirmPass})

    //call api
    submitForm(): void {
     if(this.registerForm.valid){
        this.isLogin.set(true);
      this.unSub=  this.authService.sendRegisterForm(this.registerForm.value).subscribe({
          next:(res)=>{
            //navigate login
            this.isLogin.set(false);
           setTimeout(() => {
            this.router.navigate(['login']);
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
      this.registerForm.markAllAsTouched();
     }
    }


    confirmPass(group:AbstractControl)
     {
      const password= group.get('password')?.value;
      const rePassword= group.get('rePassword')?.value;

      
       return password===rePassword? null: {mismatchPass:true};
    }


    ngOnDestroy(): void {
      this.unSub.unsubscribe();

  }

}
