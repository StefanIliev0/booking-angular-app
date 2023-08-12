import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from 'src/app/types/Place';
import { FASILITIES } from 'src/app/constants';

import { Subscription } from 'rxjs';


import { UserService } from '../../users/user-service.service';
import { PlaceService } from '../place.service';
import { UserBook } from 'src/app/types/UserBook';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit ,OnDestroy{
  isAuth = false;
  userId = '';
  curPlace! : Place;
  facilities :{fname : string , text : string , svg : {d : string , view : string}}[] = FASILITIES; 
  curFacilities :{fname : string , text : string , svg : {d : string , view : string}}[] = [] ; 
  workPrice : number = 0; 
  placeId : string = "";
  isOwner = false; 
  $userID : Subscription = new Subscription;
  $auth : Subscription = new Subscription;
  
   constructor(private route : ActivatedRoute, private userService : UserService , private placeService : PlaceService){

   }

   ngOnInit(): void {
    this.curPlace = this.route.snapshot.data["place"] as Place; 
    this.placeId = this.route.snapshot.paramMap.get('id') || "";
    this.placeService.addPlaceTostore(this.curPlace);
    if(this.curPlace.businesTravel ){
      this.workPrice =  this.placeService.generateWorkPrice(this.curPlace.price, this.curPlace._id )
    }
    this.$userID =  this.userService.getUserId().subscribe(x => {this.userId = x});
    this.$auth =  this.userService.getAuth().subscribe( x => {this.isAuth = x});
    this.curFacilities = this.facilities.filter(x => this.curPlace?.facilities.find(y => y == x.fname));
    this.isOwner = (this.curPlace.owner._id ===  this.userId) || false;
    }
    ngOnDestroy(): void {
      this.placeService.removePlaceFromStore();
      this.$auth.unsubscribe();
      this.$userID.unsubscribe();
    }
}
