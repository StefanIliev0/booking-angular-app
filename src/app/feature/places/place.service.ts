import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';


import { BASIC_URI, FASILITIES, Months } from 'src/app/constants';
import { selectLocation, selectPrice } from 'src/app/store/find.selectors';
import { PlaceActions } from 'src/app/store/place.actions';
import { selectBooks, selectComments, selectPics, selectRate } from 'src/app/store/place.selector';
import { selectUserBooks } from 'src/app/store/user.selectors';
import { Book } from 'src/app/types/Book';
import { Day, selectDay } from 'src/app/types/Day';
import { Place } from 'src/app/types/Place';
import { Place_short } from 'src/app/types/Place_short';
import { Rate } from 'src/app/types/Rate';
import { User } from 'src/app/types/User';
import { UserService } from '../users/user-service.service';
import { Subscription } from 'rxjs';
import { UsersActions } from 'src/app/store/user.actions';

type USerBooks = {from : string , to : string , place : string};


@Injectable({
  providedIn: 'any'
})
export class PlaceService {

PLACE_BASIC_URI : string= `${BASIC_URI}/places`


constructor(private http  : HttpClient , private store : Store<{place : Place ,user : User}>, private router : Router , private userService : UserService) { };


createPlace(form : NgForm){
  let facilities : string[] = []; 
  let images : string[] = []; 

  FASILITIES.forEach(x => {
    if(!!form.value?.[x.fname]){
      facilities.push(x.fname); 
    }
  })
  Object.keys(form.value).forEach((x)=> {
    if(x.startsWith("img") && !!form.value[x]){
      images.push(form.value[x]);
    }
  })
  const newPlace  =  {
    title  : form.value.title  ,
    description : form.value.description , 
    location : form.value.location  , 
    price : form.value.price   , 
    businesTravel : !!form.value.businesTravel, 
    facilities : facilities ,
    rooms : form.value.rooms , 
    images : images
  } 
  return this.http.post(`${this.PLACE_BASIC_URI}/create` , newPlace)
}
editPlace(form :NgForm , placeID : string ){
  let facilities : string[] = []; 
  let images : string[] = []; 

  FASILITIES.forEach(x => {
    if(!!form.value?.[x.fname]){
      facilities.push(x.fname); 
    }
  })
  Object.keys(form.value).forEach((x)=> {
    if(x.startsWith("img") && !!form.value[x]){
      images.push(form.value[x]);
    }
  })
  const editedPlace  =  {
    title  : form.value.title  ,
    description : form.value.description , 
    location : form.value.location  , 
    price : form.value.price   , 
    businesTravel : !!form.value.businesTravel, 
    facilities : facilities ,
    rooms : form.value.rooms , 
    images : images
  } 
  return this.http.patch(`${this.PLACE_BASIC_URI}/${placeID}/update` ,  editedPlace)
}
getHolidayPlaces (page : number , location : string , price : string){
  const currLocation = location ? `&location=${location}` : '';
  const currPrice = price ? `&price=${price}` : `` ;


 return this.http.get(`${this.PLACE_BASIC_URI}/travel-catalog/?page=${page-1}${currLocation}${currPrice}`)

}
getWorkPlaces (page : number , location : string , price : string){
  const currLocation = location ? `&location=${location}` : '';
  const currPrice = price ? `&price=${price}` : `` ;

 return this.http.get(`${this.PLACE_BASIC_URI}/work-catalog/?page=${page-1}${currLocation}${currPrice}`)
}
getUserBooks (colection : Place_short[]){
  let UserBooks : USerBooks[] = [];

  this.store.select(selectUserBooks).subscribe(x => {
    if(x){
    UserBooks = x as USerBooks[] ;}
  })
 const workColection =   colection.map((x) => {
  const curr  =   UserBooks.filter(y => y.place == x._id);
  let days = 0 ;
  if(curr.length > 0){
     curr.forEach(z => {
      const furstDate : Date = new Date(z.from);
      const secondDate : Date = new Date(z.to);
      const differenceInDays = (Number(secondDate) - Number(furstDate)) / (1000 * 60 * 60 * 24 ) 
      days = days + differenceInDays; 
     })
  }
    return {...x , price : x.price - (((x.price / 100) * (days / 10)) * 100) }
 })

return workColection

}
getPlace ( placeID : string){
 return this.http.get(`${this.PLACE_BASIC_URI}/${placeID}/details`)
}
removePlace (PlaceId : string){
let remove =  this.http.delete(`${this.PLACE_BASIC_URI}/${PlaceId}/remove`).subscribe(x => {
  if(remove.closed){
    remove.unsubscribe(); 
  }
  });
this.store.dispatch(UsersActions.removePlace({PlaceId}));
  this.router.navigate(['/']);
}
getPrice ()  {
  return this.store.select(selectPrice);
}
getLocation ()  {
  return this.store.select(selectLocation);
}
addPlaceTostore(place :Place){
  this.store.dispatch(PlaceActions.add({place})); 
}
removePlaceFromStore(){
  this.store.dispatch(PlaceActions.remove());
}
getPics(){
  return  this.store.select(selectPics)
}

getRate(){
  return this.store.select(selectRate)
}
addRate(rate : Rate , placeID : string){
  let add : Subscription = new Subscription; 
  add = this.http.post(`${this.PLACE_BASIC_URI}/${placeID}/addRate` , {rate : rate.rate}).subscribe(x => {
    if(add.closed){
      add.unsubscribe();
    }
  })
  this.store.dispatch(PlaceActions.addRate({rate}));
}
getFurstBook(books : Book[]) : Book[] {
  let nextBook :Book = {user : "" , from : "2040-01-01" , to: ""};
  if(books.length === 0){
    return books; 
  }else {
    let currDate = new Date();
    books.forEach(x => {
      if( (Number(new Date(x.from)) > Number(currDate)) && (Number(new Date(x.from)) < Number(new Date(nextBook.from)))){
        nextBook = x;
      }})
    return [nextBook]
  }}
getBooks(){
  return this.store.select(selectBooks)
}
getThisMonthArr(books : Book[] , month : number , year : number) : Day[] {
let currentMounthArr = this.generateMonth(month , year);
if(books.length == 0){
 return currentMounthArr;
}
books.forEach(x => {
  let currFromDate = new Date(x.from);
  let currToDate = new Date(x.to); 
if(currFromDate.getFullYear() == year || currToDate.getFullYear() == year){
  if(currFromDate.getMonth() == month || currToDate.getMonth() == month){
    currentMounthArr = currentMounthArr.map(y => {
      if(y.irregular){
        return y
      }
      if((currFromDate.getDate() <= y.date && currFromDate.getMonth() == month) || (currFromDate.getMonth() == month - 1)){
        if((currToDate.getDate() >= y.date && currToDate.getMonth() == month) || ( currToDate.getMonth() == month + 1)){
            return {
              irregular : false,
              date : y.date,
              avaible : false ,
              from : x.user,
              today : y.today,
              select : false
          }}}
      return y
    })}}})
return currentMounthArr 
}

private generateMonth(month : number , year : number): Day[]{
  let currentMounthArr : Day[] = []
  let furstDate =  new Date (year,month,1); 
  let lastDate = new Date(); 
  let day = furstDate;
  let varMonth = month;
  let furstDay = furstDate.getDay() == 0 ? 7 : furstDate.getDay()
  
  for (let i = 1 ; i < furstDay ; i++ ){
    currentMounthArr.push({
      irregular : true,
      date : 0,
      today : false,
      avaible : false ,
      from : '',
      select : false
  })
  }

  while(varMonth == month){
    currentMounthArr.push({
      irregular : false,
      date : day.getDate() ,
      today : new Date().getFullYear() == year && new Date().getMonth()== month ? day.getDate() == new Date().getDate() : false,
      avaible : true ,
      from : '',
      select : false
  })
  let newDay = new Date(Number(day) + (1 * 1000 * 60 * 60 * 24));
  if(newDay.getDate() == day.getDate()){
    day = new Date(Number(newDay) + (1 * 1000 * 60 * 60 * 24));
  }else {
    day = new Date(Number(day) + (1 * 1000 * 60 * 60 * 24)); 
  }
  varMonth = day.getMonth();
  if(varMonth !=month){
    lastDate = new Date(Number(day) - (1 * 1000 * 60 * 60 * 24));
  }
  }
  if(lastDate.getDay() != 0){
  for(let i = lastDate.getDay()  ; i  < 7 ; i++){
    currentMounthArr.push({
      irregular : true,
      date : 0,
      today : false,
      avaible : false ,
      from : '',
      select : false
  })
  }}

  return currentMounthArr
}

getMonth(mounth : number): string{
return Months[mounth];
}
checkIsFree(books : Book[]  , startResDay : selectDay, endResDay : selectDay){
  let startWishDay = new Date(startResDay.year, startResDay.month , startResDay.day);
  let endtWishDay = new Date(endResDay.year, endResDay.month , endResDay.day);
  let isFree = true;
books.forEach(x => {
  let fromDate = new Date(x.from);
  let toDate = new Date(x.to);
    if(Number(fromDate) > Number(startWishDay) && Number(toDate) < Number(endtWishDay)){
      isFree = false;
    }})
    return isFree
}
addBookDays(days :Day[]  , startResDay : selectDay, endResDay : selectDay ,month : number , year : number){

let thisDays  = days.map(x =>{
  x.select = false;
  return x;
})
thisDays = thisDays.map(x => {
  if(!x.irregular){
  if(year >= startResDay.year && year <= endResDay.year ){
    if(month >= startResDay.month && month <= endResDay.month){
      if(startResDay.month != endResDay.month){
        if((x.date >= startResDay.day && startResDay.month == month) || (x.date <= endResDay.day && endResDay.month == month)){
          x.select = true;
        }}
      if(startResDay.month == endResDay.month && (x.date >= startResDay.day && x.date <= endResDay.day)){
        x.select = true;
      }
    }}}
return x
})
return thisDays
}
makeBook(from : string , to : string , placeID : string ){
  let user = ''
  let $user  : Subscription = new Subscription ;
  let $Req : Subscription = new Subscription ;
  $user =  this.userService.getUserId().subscribe(x => {
    user = x ;
  } )
  const book : Book = {from ,to , user } 
$Req = this.http.post(`${this.PLACE_BASIC_URI}/${placeID}/makeBook` , {book}).subscribe(x => { 
  if($Req.closed){
    $Req.unsubscribe();
  }
}) 
this.store.dispatch(UsersActions.addBook({ userBook : {from : book.from , to : book.to , place : placeID}}));
this.store.dispatch (PlaceActions.addBook({book}));

if($user.closed){
      $user.unsubscribe();
    }
}
addComment(text : string , placeID : string ){
  let $comment : Subscription = new Subscription; 
  let comm
  $comment = this.http.post(`${this.PLACE_BASIC_URI}/${placeID}/addComment` , {comment : text}).subscribe((x) => {
    comm = x as Comment;
    this.store.dispatch(PlaceActions.addComment({comment : comm}))
  }) ;
  if($comment.closed){
    $comment.unsubscribe();
  }
}
getComments(){
 return this.store.select(selectComments)
}
deleteComment(commentId : string , placeID : string){
  let $comment : Subscription = new Subscription; 
  $comment = this.http.delete(`${this.PLACE_BASIC_URI}/${placeID}/removeComment/${commentId}`).subscribe() ;
  this.store.dispatch(PlaceActions.removeComment({commentId}))
  if($comment.closed){
    $comment.unsubscribe();
  }
}
createEditForm(place : Place ){
let placeFrorm = {
  title: "",
  location: "",
  description: "",
  price: 0,
  rooms: 0,
  businesTravel: false,
  wifi: false,
  parking: false,
  beachAccess: false,
  kitchen: false,
  privateBathroom: false,
  privateToilet: false,
  lounge: false,
  pool: false,
  publicTransportAccess: false,
  seaView: false,
  cityView: false,
  streetView: false,
  courtyardView: false,
  largeDoubleBed: false,
  smallDoubleBed: false,
  singleBed: false,
  sofa: false,
  terrace: false,
  "img-1" : ""
}
let currForm = placeFrorm;
currForm.title = place.title;
currForm.price = place.price;
currForm.description = place.description;
currForm.location = place.location;
currForm.rooms = place.rooms;
FASILITIES.forEach(x => {
  if(place.facilities.find(y => y == x.fname)){
  currForm = {...currForm , [x.fname] : true }
  }
})
place.images.forEach((x,i)=>{
  let curString = `img-${i + 1}`
currForm = {...currForm , [curString] : x}
})
return currForm;
}

}