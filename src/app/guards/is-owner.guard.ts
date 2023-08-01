import {  inject  } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn  } from '@angular/router';
import { UserService } from '../feature/users/user-service.service';
import { Subscription } from 'rxjs';



 export function isOwnerGuard() : CanActivateFn {
      
      return  ( route :ActivatedRouteSnapshot ) => {
         let isOwner = false; 
        let $places : Subscription = new Subscription; 
        let curPlaceId = route.paramMap.get("id");
        $places = inject(UserService).getPlaces().subscribe(x => {
            if(x.find( x => x._id == curPlaceId)){
                isOwner = true; 
            }
        })
       return isOwner } ;
    };
