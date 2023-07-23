import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { Place_short } from 'src/app/types/Place_short';
import { Store } from '@ngrx/store';
import { selectLocation, selectPrice } from 'src/app/store/find.selectors';


type holidayResp = {
  colection: Place_short[]  , 
  colectionLength : number
}

@Component({
  selector: 'app-holyday-tips',
  templateUrl: './holyday-tips.component.html',
  styleUrls: ['./holyday-tips.component.css']
})
export class HolydayTipsComponent implements OnInit  {
  colection:Place_short[] = []; 
  page = 1;
  location = '';
  price = '';
  maxPage = 1;
  constructor( private service : PlaceService , private store : Store){
    store.select(selectLocation).subscribe(res => {
      if(this.location != res){
      this.location = res;
         this.service.getHolidayPlaces(this.page ,this.location,this.price).subscribe(res  => {
        const response = res as holidayResp ; 
        this.colection = response.colection ;
        this.maxPage = Math.ceil( response.colectionLength / 6) ; 
      })}
    })
    store.select(selectPrice).subscribe(res => {
      if(this.price != res){
      this.price = res;
      this.service.getHolidayPlaces(this.page ,this.location,this.price).subscribe(res  => {
     const response = res as holidayResp ; 
     this.colection = response.colection ;
     this.maxPage = Math.ceil( response.colectionLength / 6) ; 
   })}
    })
  }
  replacePage(num :number){
   this.page = num; 
   this.service.getHolidayPlaces(this.page ,this.location,this.price).subscribe(res  => {
    const response = res as holidayResp ; 
    this.colection = response.colection ;
    this.maxPage = Math.ceil( response.colectionLength / 6) ; 
  })
  }
  

  ngOnInit(): void {
    this.service.getHolidayPlaces(this.page ,this.location,this.price).subscribe(res  => {
     const response = res as holidayResp;
     this.colection = response.colection ;
     this.maxPage = Math.ceil( response.colectionLength / 6) ; 
    })
  
  }

}
