
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWish } from '../../shared/interfaces/iwish';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly wishlistService=inject(WishlistService)
  private readonly productsService=inject(ProductsService)
  productList:WritableSignal<Iproduct[]>=signal([])
  categoryList:WritableSignal<Icategories[]>=signal([])
  private readonly  productCategories=inject(CategoriesService);
  private readonly  cartService=inject(CartService);
   // wishList:WritableSignal<IWish[]> = signal([{} as IWish]);
   // isInWishListBoolean:WritableSignal<boolean> = signal(false )
  private toastr=inject(ToastrService);
  unSub:Subscription=new Subscription();
  unSub2:Subscription=new Subscription();
  unSub3:Subscription=new Subscription();
  unSub4:Subscription=new Subscription();
  isShown:WritableSignal<boolean> = signal(false);
  isShown2:WritableSignal<boolean> = signal(false);

  
  getAllProducts():void
  {
   this.unSub= this.productsService.getProducts().subscribe({
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
  
  ngOnInit(): void {
      this.getAllProducts();
      this.getProductCategories()
  }
  
  
  getProductCategories():void{
   this.unSub2= this.productCategories.getCategories().subscribe({
      next:(res)=>{
        this.categoryList.set(res.data)
        console.log (this.categoryList())
        this.isShown2.set(true);

      },
      error:(err)=> {
          console.log(err)
      },
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayHoverPause:true,
    autoplayTimeout:2000,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
   
  }
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 200,
    autoplay: true,
    autoplayHoverPause:true,
    autoplayTimeout:3000,
    items:1,
    nav: false
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

  /*getWishListData():void{
    this.unSub4= this.wishlistService.GetLoggedUserWishList().subscribe(
       {
         next:(res)=>{
             this.wishList.set(res.data);
          console.log(res)
         },
         error:(err)=>{
           console.log(err);
         }
       }
     )
   }

  /* isInWishList(id:string):void{
    for (const element of   this.wishList())
    {
      if(element.id==id)this.isInWishListBoolean.set(true);
      console.log(true)
    
    }
    this.isInWishListBoolean.set(false)
    console.log(true)
  }*/
  
  ngOnDestroy(): void {
    this.unSub.unsubscribe();
    this.unSub2.unsubscribe();
    this.unSub3.unsubscribe();
    this.unSub4.unsubscribe();
   }
  
 

}
