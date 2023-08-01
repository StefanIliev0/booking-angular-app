import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PlaceService } from '../../place.service';
import { UserService } from 'src/app/feature/users/user-service.service';
import { Book } from 'src/app/types/Book';
import { Subscription } from 'rxjs';
import { Day, selectDay } from 'src/app/types/Day';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit,OnDestroy {
@Input() isOwner : boolean  = false; 
@Input() UserId : string  = ""; 
@Input() placeId : string = "";
books :Book[] = []
thisMounth = new Date().getMonth() ;
currentMoth = ""
year = new Date().getFullYear() ;
currentMonthArr : Day[] = [];
startResDay : selectDay  = { day : 0 , month : 0,year : 0};
endResDay : selectDay = { day : 0 , month : 0,year : 0};
$books : Subscription = new Subscription();


constructor(private placeService : PlaceService , private userServise : UserService){}

previousMonth(){
  this.thisMounth = this.thisMounth - 1; 
  if(this.thisMounth < 0){
    this.year = this.year - 1 ;
    this.thisMounth = 11 
  }
  this.currentMonthArr  = this.placeService.getThisMonthArr(this.books , this.thisMounth , this.year) ;
  this.currentMoth = this.placeService.getMonth(this.thisMounth);
  this.currentMonthArr = this.placeService.addBookDays(this.currentMonthArr  , this.startResDay, this.endResDay , this.thisMounth , this.year)
}
nextMonth(){
  this.thisMounth = this.thisMounth + 1; 
  if(this.thisMounth > 11){
    this.year = this.year + 1 ;
    this.thisMounth = 0 
  } 
  this.currentMonthArr  = this.placeService.getThisMonthArr(this.books , this.thisMounth , this.year) ;
  this.currentMoth = this.placeService.getMonth(this.thisMounth);
  this.currentMonthArr = this.placeService.addBookDays(this.currentMonthArr  , this.startResDay, this.endResDay , this.thisMounth , this.year)
}
setResDate(day : Day){
  //check if resDay is set
if(this.startResDay.day == 0){
  this.startResDay = { day : day.date , month :this.thisMounth,year : this.year};
  this.endResDay = { day : day.date , month :this.thisMounth,year : this.year};
};
//check if resEndDay is set
if(this.startResDay.day !== 0 && this.startResDay.day == this.endResDay.day && this.startResDay.month == this.endResDay.month && this.startResDay.year == this.endResDay.year ){
 if((this.startResDay.day < day.date && this.startResDay.month == this.thisMounth) || (this.startResDay.month < this.thisMounth)){
  let isFreeReservation = this.placeService.checkIsFree(this.books , this.startResDay ,{year : this.year , month : this.thisMounth , day : day.date})
  if(isFreeReservation){
  this.endResDay = { day : day.date , month :this.thisMounth,year : this.year};
  }else {
    this.startResDay = { day : day.date , month :this.thisMounth,year : this.year};
    this.endResDay = { day : day.date , month :this.thisMounth,year : this.year};
  }
}else{
    this.startResDay = { day : day.date , month :this.thisMounth,year : this.year};
    this.endResDay = { day : day.date , month :this.thisMounth,year : this.year};
  }

} else if(this.startResDay.day !== 0 && (this.startResDay.day != this.endResDay.day || this.startResDay.month != this.endResDay.month || this.startResDay.year != this.endResDay.year )){
  this.startResDay = { day : day.date , month :this.thisMounth,year : this.year};
  this.endResDay = { day : day.date , month :this.thisMounth,year : this.year};
}

this.currentMonthArr = this.placeService.addBookDays(this.currentMonthArr  , this.startResDay, this.endResDay , this.thisMounth , this.year)
}
makeBook(){
  let from = `${this.startResDay.year}-${this.startResDay.month < 10 ? '0'+ (this.startResDay.month + 1) : this.startResDay.month +1 }-${this.startResDay.day < 10 ? '0'+ (this.startResDay.day  ) : this.startResDay.day  }`
  let to = `${this.endResDay.year}-${this.endResDay.month < 10 ? '0'+ (this.endResDay.month + 1 ): this.endResDay.month + 1 }-${this.endResDay.day < 10 ? '0'+ (this.endResDay.day ) : this.endResDay.day }`
  
  
  this.placeService.makeBook(from,to , this.placeId );
  this.startResDay  = { day : 0 , month : 0,year : 0};
  this.endResDay  = { day : 0 , month : 0,year : 0};
  this.currentMonthArr  = this.placeService.getThisMonthArr(this.books , this.thisMounth , this.year) ;
  this.currentMoth = this.placeService.getMonth(this.thisMounth);
}
ngOnInit(): void {
  this.$books = this.placeService.getBooks().subscribe(x => {
    this.books = x ; 
  })
  this.currentMonthArr  = this.placeService.getThisMonthArr(this.books , this.thisMounth , this.year) ;
  this.currentMoth = this.placeService.getMonth(this.thisMounth);
}
ngOnDestroy(): void {
  this.$books.unsubscribe(); 
}

}
