import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';


import { BASIC_URI, FASILITIES } from 'src/app/constants';
import { selectUserBooks } from 'src/app/store/user.selectors';
import { Place } from 'src/app/types/Place';
import { Place_short } from 'src/app/types/Place_short';
import { User } from 'src/app/types/User';


type USerBooks ={from : string , to : string , place : string};

@Injectable({
  providedIn: 'any'
})
export class PlaceService {

  PLACE_BASIC_URI : string= `${BASIC_URI}/places`


  constructor(private http  : HttpClient , private store : Store<{place : Place ,user : User}>) { };


createPlace(form : NgForm){
  let facilities : string[] = []; 
  let images : string[] = []; 

  FASILITIES.forEach(x => {
    if(!!form.value?.[x]){
      facilities.push(x); 
    }
  })
  Object.keys(form.value).forEach((x)=> {
    if(x.startsWith("img")){
      images.push(form.value[x])
    }
  })
  const newPlace  =  {
    title  : form.value.title  ,
    description : form.value.description , 
    location : form.value.location  , 
    price : form.value.price   , 
    businesTravel : !!form.value.businesTravel, 
    facilities : facilities ,
    images : images
  } 
  return this.http.post(`${this.PLACE_BASIC_URI}/create` , newPlace)
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


getBooks (colection : Place_short[]){
  let UserBooks : USerBooks[] = [];

  this.store.select(selectUserBooks).subscribe(x => {
    UserBooks = x as USerBooks[] ;
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
}