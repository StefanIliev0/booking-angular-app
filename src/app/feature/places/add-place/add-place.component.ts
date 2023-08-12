import { Component, OnDestroy, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

import { PlaceService } from '../place.service';
import { Router } from '@angular/router';
import { Place } from 'src/app/types/Place';
import { FASILITIES } from 'src/app/constants';
import { Subscription } from 'rxjs';
import { UserService } from '../../users/user-service.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnDestroy  {
$newPlace :Subscription = new Subscription;
@ViewChild('form') form? : NgForm;
files : File[] = [] ;  
isUri : boolean = false; 

picItems : number[] = [1];
fasilities : {fname : string , text : string , svg :{d : string , view : string}}[] = FASILITIES ; 
images : string[] = []; 
constructor(private service : PlaceService , private router : Router , private userService : UserService){};

// add new field for imageURI 
  addPicField(item : number){
    if(this.form?.value?.[`img-${item}`] && item == this.picItems.length){
      this.picItems = [...this.picItems , Number(item) + 1 ]
      this.images[item - 1] =  this.form?.value?.[`img-${item}`]; 
    }
    if(this.form?.value?.[`img-${item}`] == ""){
      this.picItems = this.picItems.slice(0 , -1);
      this.images[item - 1] = ""; 
    }
  }
  // change profile picture get  method  files / URI 
changeGetPictureMethod(){
  this.isUri = !this.isUri;
  this.picItems = [1];
  this.images = [];
  this.files = [] ; 
}
// makes a request to create a new location and adds the location to the specific user's data store
  async create (form : NgForm ){

    if(form.invalid ){
      this.userService.addErr("Sorry , but something in your fields isn't right.");
     return
    }
    this.$newPlace = await (await this.service.createPlace(form , this.files)).subscribe(res => {
      const newPlace = res as Place; 
      this.userService.addPlace(newPlace._id);
      this.router.navigate(['/places', newPlace._id , 'details']);
    } )
    
    
  }
  //get files from upload files component 
setFiles(images : File[]){
  this.files = images;
}
  ngOnDestroy(): void {
    this.$newPlace.unsubscribe();
  }

}
