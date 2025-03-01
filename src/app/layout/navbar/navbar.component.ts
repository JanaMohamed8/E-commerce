import { AuthService } from './../../core/services/auth/auth.service';
import { Component, ElementRef, input, InputSignal, signal, ViewChild, WritableSignal, inject, OnInit, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
declare var Flowbite: any;

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
   
 isLogin:InputSignal<boolean> = input<boolean>(true)
  readonly authService =inject(AuthService)
  readonly cartService =inject(CartService)
  cartNumNav=computed(()=> this.cartService.cartNum())

  constructor(private flowbiteService: FlowbiteService
  ) {}

 

  @ViewChild('toggle') toggleBtn !:ElementRef;
  toggleChecked:WritableSignal<boolean> = signal(false)
   
     onChangeToggle():void{
      this.toggleChecked.set(this.toggleBtn.nativeElement.checked)
    if(this.toggleChecked()){
      localStorage.setItem("theme", 'dark')
    }else{
      localStorage.setItem("theme", 'light')
    }


    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
  } else {
      document.documentElement.classList.remove('dark')
  }
      console.log(this.toggleChecked())
  }

  logOutBtn():void{
    this.authService.logOut()
  }

  ngOnInit(): void {
    if(this.isLogin()){
      this.cartService.GetLoggedUserCart().subscribe({
        next: (res)=>{
             this.cartService.cartNum.set(res.numOfCartItems)
        }
      })
        
    }
  }


}
