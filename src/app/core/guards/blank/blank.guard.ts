import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const blankGuard: CanActivateFn = (route, state) => {
   const Id=inject(PLATFORM_ID);
      const router=inject(Router);
  
         if(isPlatformBrowser(Id))
         {
          if(localStorage.getItem("userToken") !== null){
            router.navigate(["/home"]);
            return false;
          }
          else{
            return true;
          }
         }
         return false;
};
