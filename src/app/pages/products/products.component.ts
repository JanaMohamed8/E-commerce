import { Component, inject, NgModule, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-products',
  imports: [SearchPipe,FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
   private readonly productsService=inject(ProductsService)
   productList:WritableSignal<Iproduct[]>=signal([])
   text:WritableSignal<string>=signal('')
   private readonly  cartService=inject(CartService);
     private toastr=inject(ToastrService);
     unSub:Subscription=new Subscription();
  unSub3:Subscription=new Subscription();
   private readonly wishlistService=inject(WishlistService)
   isShown:WritableSignal<boolean> = signal(false);
     

ngOnInit(): void {
  this.getAllProducts();
}
getAllProducts():void
  {
    this.productsService.getProducts().subscribe({
      next:(res)=>{
       this.productList.set(res.data)
       console.log(this.productList())
       this.isShown.set(true);
      },
      error:(err)=>{
        console.log(err);
      }
     })
  }
  addToCart(id:string):void
  {
    
    this.unSub3= this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
            console.log(res)
            this.cartService.cartNum.set(res.numOfCartItems)
            this.toastr.success("Product added successfully to your cart","Fresh Cart")
      },
      error: (err)=>{
        console.log(err)
      }
     })
  }

  addToWishList(id:string):void
  {
    
    this.unSub3= this.wishlistService.addProductToWishList(id).subscribe({
      next:(res)=>{
            console.log(res)
            this.toastr.success("Product added successfully to your wishlist","Fresh Cart")
      },
      error: (err)=>{
        console.log(err)
      }
     })
  }
  ngOnDestroy(): void {
    this.unSub.unsubscribe();
    this.unSub3.unsubscribe();
}


}
