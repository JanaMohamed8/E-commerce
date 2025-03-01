import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/Categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly categoriesService=inject(CategoriesService)
  CategoriesList:WritableSignal<Icategories[]>=signal([{} as Icategories] )
  unSub:Subscription=new Subscription();
  isShown:WritableSignal<boolean> = signal(false);


  ngOnInit(): void {
    this.unSub=  this.categoriesService.getCategories().subscribe({
        next: (res) => {
          this.CategoriesList.set(res.data)
          console.log(this.CategoriesList());
          this.isShown.set(true);
        },error: (err) => {
          console.log(err);
        }
      })
  }
  ngOnDestroy(): void {
    this.unSub.unsubscribe();
}


}
