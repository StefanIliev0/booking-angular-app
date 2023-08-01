import {  inject  } from '@angular/core';
import { CanActivateFn  } from '@angular/router';
import { UserService } from '../feature/users/user-service.service';



 export function isntAuthGuard() : CanActivateFn {
      
      return  () => {
        const isAuth = inject(UserService).isAuth();
        
       return !isAuth } ;
    };
