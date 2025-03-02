
import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { BlankComponent } from './layout/blank/blank.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { blankGuard } from './core/guards/blank/blank.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    {
        path: '', component: AuthComponent,canActivate:[blankGuard], children: [
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
            { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Login' },
            { path: 'forgot', loadComponent: () => import('./pages/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent), title: 'Login' },
           
        ]
    },

    {
        path: '', component: BlankComponent,canActivate:[authGuard], children: [
            { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
            { path: 'allorders', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
            { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
            { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
            { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: 'Products' },
            { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
            { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent), title: 'wishlist' },
            { path: 'checkout/:id', loadComponent: () => import('./pages/payment/payment.component').then(m => m.PaymentComponent), title: 'payment' },
            { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: 'details' },
            { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'Not Found' }
        ]
    }
];
