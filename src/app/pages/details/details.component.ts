import { IProductdetails } from './../../shared/interfaces/iproductdetails';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit,OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  productId: WritableSignal<string | null> = signal('');
  productData: WritableSignal<IProductdetails> = signal({} as IProductdetails);
  private readonly productsService = inject(ProductsService);
  isShown:WritableSignal<boolean> = signal(false);
   

  unSub:Subscription=new Subscription();
  unSub2:Subscription=new Subscription();
  private toastr=inject(ToastrService);
    unSub3:Subscription=new Subscription();
     private readonly  cartService=inject(CartService);

  ngOnInit(): void {
    this.unSub =this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        this.productId.set(p.get('id'));
        // console.log(this.productId())

        //call api
        this.unSub2=  this.productsService.getSpecificProduct(this.productId()!).subscribe({
          next: (res) => {
            // console.log(res.data)
            this.productData.set(res.data);
            console.log(this.productData());
            this.isShown.set(true);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
      this.unSub.unsubscribe();
      this.unSub2.unsubscribe();
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


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    items: 1,    
    autoplay:true,
    // autoplayTimeout:2500,
    // autoplayHoverPause:true
  };
}
