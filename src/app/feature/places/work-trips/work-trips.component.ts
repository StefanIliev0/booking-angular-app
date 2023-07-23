import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { Place_short } from 'src/app/types/Place_short';
import { Store } from '@ngrx/store';
import { selectLocation, selectPrice } from 'src/app/store/find.selectors';


type workResp = {
  colection: Place_short[]  , 
  colectionLength : number
}

@Component({
  selector: 'app-work-trips',
  templateUrl: './work-trips.component.html',
  styleUrls: ['./work-trips.component.css']
})
export class WorkTripsComponent implements OnInit {
  colection:Place_short[] = []; 
  page = 1;
  location = '';
  price = '';
  maxPage = 1;
  constructor( private service : PlaceService , private store : Store){
    store.select(selectLocation).subscribe(res => {
      if(this.location != res){
      this.location = res;
         this.service.getWorkPlaces(this.page ,this.location,this.price).subscribe(res  => {
        let response = res as workResp ; 
        this.colection = service.getBooks(response.colection)
        this.maxPage = Math.ceil( response.colectionLength / 6) ; 
      })}
    })
    store.select(selectPrice).subscribe(res => {
      if(this.price != res){
      this.price = res;
      this.service.getWorkPlaces(this.page ,this.location,this.price).subscribe(res  => {
     const response = res as workResp ; 
     this.colection = service.getBooks(response.colection)
     this.maxPage = Math.ceil( response.colectionLength / 6) ; 
   })}
    })
  }
  replacePage(num :number){
   this.page = num; 
   this.service.getWorkPlaces(this.page ,this.location,this.price).subscribe(res  => {
    const response = res as workResp ; 
    this.colection = this.service.getBooks(response.colection)
    this.maxPage = Math.ceil( response.colectionLength / 6) ; 
  })
  }



  ngOnInit(): void {
    this.service.getWorkPlaces(this.page ,this.location,this.price).subscribe(res  => {
     const response = res as workResp;
     this.colection = this.service.getBooks(response.colection)
     this.maxPage = Math.ceil( response.colectionLength / 6) ; 
    })
  
  }
}
