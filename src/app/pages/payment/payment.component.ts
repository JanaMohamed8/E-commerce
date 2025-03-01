import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../core/services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{

   isLogin:WritableSignal<boolean>=signal(false)
     msgError:WritableSignal<string>=signal('')
     createdAcc:WritableSignal<string>=signal('')
     private readonly orderService=inject(OrderService)
     private readonly activatedRoute=inject(ActivatedRoute)
     cartId:WritableSignal<string>=signal('')
     unSub:Subscription=new Subscription();
  unSub2:Subscription=new Subscription();
         
  private readonly formBuilder=inject(FormBuilder)
          payment:FormGroup=this.formBuilder.group({
          details:[null,[Validators.required ]],
          phone:[null,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]],
          city: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
        })

      ngOnInit(): void {
        this.getCartId()
      }

        submitForm(): void {
          if(this.payment.valid){
             this.isLogin.set(true);
            this.unSub= this.orderService.sendOnlineOrder(this.cartId(),this.payment.value).subscribe({
               next:(res)=>{
                 //navigate login
                 this.isLogin.set(false);
                setTimeout(() => {
                  open(res.session.url,'_self')
                }, 500);
                 this.createdAcc.set(res.status
                 );
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
           this.payment.markAllAsTouched();
          }
         }

         getCartId():void{
         this.unSub2=  this.activatedRoute.paramMap.subscribe({
            next: (res)=>{
             this.cartId.set(res.get('id')!)
            }
          })
         }
         ngOnDestroy(): void {
          this.unSub.unsubscribe();
          this.unSub2.unsubscribe();
      }
     
     
}
