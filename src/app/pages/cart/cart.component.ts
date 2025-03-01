import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
   
  private readonly cartService=inject(CartService)
  CartData:WritableSignal<ICart> = signal({} as ICart);
  private toastr=inject(ToastrService);
  unSub:Subscription=new Subscription();
  unSub2:Subscription=new Subscription();
  unSub3:Subscription=new Subscription();
  unSub4:Subscription=new Subscription();
  isShown:WritableSignal<boolean> = signal(false);

   
     ngOnInit(): void {
      this.getCartData()
     }


      getCartData():void{
       this.unSub2= this.cartService.GetLoggedUserCart().subscribe(
          {
            next:(res)=>{
             this.CartData.set(res)
             console.log(this.CartData())
             this.isShown.set(true);
            },
            error:(err)=>{
              console.log(err);
            }
          }
        )
      }
     removeItem(id:string):void{
       this.unSub= this.cartService.removeSpecificCartItem(id).subscribe(
          {
            next:(res)=>{
             this.CartData.set(res)
             this.cartService.cartNum.set(res.numOfCartItems)
             this.toastr.success("Product Removed successfully.","Fresh Cart")
            },
            error:(err)=>{
              console.log(err);
            }
          }
        )
      }
      updateProductQuantity(id:string,count:number):void{
       this.unSub3= this.cartService.updateCartProductQuantity(id,count).subscribe(
          {
            next:(res)=>{
             this.CartData.set(res)
             this.toastr.success("Success.","Fresh Cart")
            },
            error:(err)=>{
              console.log(err);
            }
          }
        )
      }

      clearCart():void{
       this.unSub4= this.cartService.clearCartItem().subscribe({
          next:(res)=>{
            if(res.message === 'success'){;
              //this.CartData.set({} as ICart);
              this.getCartData()
              this.cartService.cartNum.set(0)
              this.toastr.success("Cart Cleared successfully.","Fresh Cart")
            };
           console.log(res)
          },error:(err)=>{
            console.log(err);
          }
        })
      }

      ngOnDestroy(): void {
        this.unSub.unsubscribe();
        this.unSub2.unsubscribe();
        this.unSub3.unsubscribe();
        this.unSub4.unsubscribe();
    }




}
