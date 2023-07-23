import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Store } from '@ngrx/store';
import { FindActions } from 'src/app/store/find.actions';
import { selectLocation, selectPrice } from 'src/app/store/find.selectors';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  Currentlocation :string = "";
  CurrentPrice :string = ""; 



  constructor(private store : Store){
  
  this.store.select(selectLocation).subscribe(res =>  {
     this.Currentlocation = res; 
}) 
this.store.select(selectPrice).subscribe(res =>  {
      this.CurrentPrice = res; 
    
}) 
  }


  async find(form : NgForm){
    
  if(form.invalid ){
    return
   }
   let currLoc = form.value.location.trim();

   this.store.dispatch(FindActions.replaceLocation({location : (currLoc.substring(0,1).toUpperCase() + currLoc.substring(1).toLowerCase())}));    
   this.store.dispatch(FindActions.replacePrice({price : form.value.price}));
  }

}
