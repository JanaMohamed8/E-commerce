import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICart } from '../../shared/interfaces/icart';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWish } from '../../shared/interfaces/iwish';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

   private readonly wishlistService=inject(WishlistService)
    wishList:WritableSignal<IWish[]> = signal([{} as IWish]);
    private toastr=inject(ToastrService);
    unSub:Subscription=new Subscription();
    unSub2:Subscription=new Subscription();
    unSub3:Subscription=new Subscription();
    isShown:WritableSignal<boolean> = signal(false);
  
     
       ngOnInit(): void {
        this.getWishListData()
       }
  
        getWishListData():void{
         this.unSub2= this.wishlistService.GetLoggedUserWishList().subscribe(
            {
              next:(res)=>{
                  this.wishList.set(res.data);
               console.log(res)
               this.isShown.set(true);
              },
              error:(err)=>{
                console.log(err);
              }
            }
          )
        }

       removeItem(id:string):void{
         this.unSub= this.wishlistService.removeSpecificWishListItem(id).subscribe(
            {
              next:(res)=>{
                console.log(res)
                //this.wishList.set(res.data);
                this.getWishListData()
               this.toastr.success("Product Removed successfully.","Fresh Cart")
              },
              error:(err)=>{
                console.log(err);
              }
            }
          )
        }
        
  
        ngOnDestroy(): void {
          this.unSub.unsubscribe();
          this.unSub2.unsubscribe();
          this.unSub3.unsubscribe();
       
      }
  
  
  

}
