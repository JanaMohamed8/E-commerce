import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
     
   private readonly brandService=inject(BrandService);
     brandList:WritableSignal<IBrand[]>=signal([{} as IBrand] )
     isShown:WritableSignal<boolean> = signal(false);
   
    
   ngOnInit(): void {
       this.brandService.getAllBrands().subscribe({
           next: (res) => {
            console.log(res);
            this.brandList.set(res.data);
            this.isShown.set(true);

           },error:(err)=>{
            console.log(err);
           }
       })
   }
   
}
