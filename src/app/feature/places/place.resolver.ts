import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';
import { PlaceService } from './place.service';
import { Observable } from 'rxjs';


export const placeResolver: ResolveFn<Observable<any>> =  (route : ActivatedRouteSnapshot, state :RouterStateSnapshot ) => {
 const id = route.paramMap.get('id') || ""; 
 let place =  inject(PlaceService).getPlace(id); 
 return place
}
;
