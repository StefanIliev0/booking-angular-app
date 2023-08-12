import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { Place_short } from 'src/app/types/Place_short';
import { Subscription } from 'rxjs';


type holidayResp = {
  colection: Place_short[]  , 
  colectionLength : number
}

@Component({
  selector: 'app-holyday-tips',
  templateUrl: './holyday-tips.component.html',
  styleUrls: ['./holyday-tips.component.css']
})
export class HolydayTipsComponent implements OnInit ,OnDestroy {
  colection:Place_short[] = []; 
  page = 1;
  location = '';
  price = '';
  maxPage = 1;
  $holidayPlaces : Subscription = new Subscription; 
  $location : Subscription = new Subscription; 
  $prise : Subscription = new Subscription; 

  constructor( private service : PlaceService ){
    this.$location  =  this.service.getLocation().subscribe(res => {
      if(this.location != res){
      this.location = res;
      this.$holidayPlaces =this.service.getHolidayPlaces(this.page ,this.location,this.price).subscribe(res  => {
        const response = res as holidayResp ; 
        this.colection = response.colection ;
        this.maxPage = Math.ceil( response.colectionLength / 6) ; 
      })}
    })
    this.$prise = service.getPrice().subscribe(res => {
      if(this.price != res){
      this.price = res;
      this.$holidayPlaces =this.service.getHolidayPlaces(this.page ,this.location,this.price).subscribe(res  => {
     const response = res as holidayResp ; 
     this.colection = response.colection ;
     this.maxPage = Math.ceil( response.colectionLength / 6) ; 
   })}
    })
  }
  //function that is passed to a shared element that returns the page whose content to load.
  replacePage(num :number){
   this.page = num; 
   this.$holidayPlaces =this.service.getHolidayPlaces(this.page ,this.location,this.price).subscribe(res  => {
    const response = res as holidayResp ; 
    this.colection = response.colection ;
    this.maxPage = Math.ceil( response.colectionLength / 6) ; 
  })
  }
  ngOnInit(): void {
    this.$holidayPlaces =this.service.getHolidayPlaces(this.page ,this.location,this.price).subscribe(res  => {
     const response = res as holidayResp;
     this.colection = response.colection ;
     this.maxPage = Math.ceil( response.colectionLength / 6) ; 
    })
  
  }
  ngOnDestroy(): void {
    this.$location.unsubscribe();
    this.$prise.unsubscribe();
    this.$holidayPlaces.unsubscribe();
  }
}
