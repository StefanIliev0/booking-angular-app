import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { Place_short } from 'src/app/types/Place_short';
import { Subscription } from 'rxjs';


type workResp = {
  colection: Place_short[]  , 
  colectionLength : number
}

@Component({
  selector: 'app-work-trips',
  templateUrl: './work-trips.component.html',
  styleUrls: ['./work-trips.component.css']
})
export class WorkTripsComponent implements OnInit,OnDestroy {
  colection:Place_short[] = []; 
  page = 1;
  location = '';
  price = '';
  maxPage = 1;
  $workPlaces : Subscription = new Subscription; 
  $location : Subscription = new Subscription; 
  $prise : Subscription = new Subscription; 
  constructor( private service : PlaceService ){
    
    this.$location  =  this.service.getLocation().subscribe(res => {
    if(this.location != res){
      this.location = res;
      this.$workPlaces = this.service.getWorkPlaces(this.page ,this.location,this.price).subscribe(res  => {
        let response = res as workResp ; 
        this.colection = service.getUserBooks(response.colection)
        this.maxPage = Math.ceil( response.colectionLength / 6) ; 
      })}
    })
    this.$prise = service.getPrice().subscribe(res => {
      if(this.price != res){
      this.price = res;
      this.$workPlaces = this.service.getWorkPlaces(this.page ,this.location,this.price).subscribe(res  => {
     const response = res as workResp ; 
     this.colection = service.getUserBooks(response.colection)
     this.maxPage = Math.ceil( response.colectionLength / 6) ; 
   })}
    })
  }
    //function that is passed to a shared element that returns the page whose content to load.
  replacePage(num :number){
   this.page = num; 
   this.$workPlaces = this.service.getWorkPlaces(this.page ,this.location,this.price).subscribe(res  => {
    const response = res as workResp ; 
    this.colection = this.service.getUserBooks(response.colection)
    this.maxPage = Math.ceil( response.colectionLength / 6) ; 
  })
  }
  ngOnInit(): void {
    this.$workPlaces = this.service.getWorkPlaces(this.page ,this.location,this.price).subscribe(res  => {
     const response = res as workResp;
     this.colection = this.service.getUserBooks(response.colection)
     this.maxPage = Math.ceil( response.colectionLength / 6) ; 
    })
  }
  ngOnDestroy(): void {
    this.$location.unsubscribe();
    this.$prise.unsubscribe();
    this.$workPlaces.unsubscribe();
  }
}
