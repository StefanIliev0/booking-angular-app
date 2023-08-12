import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

import { PlaceService } from '../place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/types/Place';
import { BASIC_URI, FASILITIES } from 'src/app/constants';
import { Subscription } from 'rxjs';
import { UserService } from '../../users/user-service.service';


@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnDestroy,OnInit  {
  $newPlace :Subscription = new Subscription;
  @ViewChild('form') form? : NgForm;
  previousImages : string[] = []; 
  remove : boolean[] = [];
  files : File[] = [] ;  
  images : string[] = []; 
  isUri : boolean = false; 
  curPlace : Place[] = [];
  placeId : string = '';
  curForm = {};
  picItems : number[] = [1];
  fasilities : {fname : string , text : string , svg :{d : string , view : string}}[] = FASILITIES ; 
      

    constructor(private service : PlaceService , private router : Router , private userService : UserService , private route : ActivatedRoute){

    }
    // change profile picture get  method  files / URI ;
    changeGetPictureMethod(){
      this.isUri = !this.isUri;
      this.picItems = [1];
      this.images = [];
      this.files = [] ; 
    }
    setFiles(images : File[]){
      this.files = images;
    }
    // add new field for imageURI ;
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
    // makes a request to remove current picture;
    removePic(pic : string){
      this.previousImages = this.previousImages.filter(x => x !== pic);
      if(pic.startsWith(BASIC_URI)){
        this.service.removePicture(pic); 
      }
    }
    // makes a request to edit current location and edit the location to the specific user's data store;
    async edit (form : NgForm ){
  
      if(form.invalid ){
        this.userService.addErr("Sorry , but something in your fields isn't right.");
       return
      }
  
      this.$newPlace = (await this.service.editPlace(form , this.placeId , this.previousImages , this.files )).subscribe(res => {
        const editPlace = res as Place; 
      } )
        this.router.navigate([`/places/${this.placeId}/details/`]);
    }
    // show and hide Delete div pressing which removes the pictures
    ShowDelete(index : number){
      this.remove[index] = true; 
    }
    hideDelete(index : number){
      setTimeout(( ) => {
        this.remove[index] = false; 
      }, 100)
    }
    ngOnInit(): void { 
    this.curPlace[0] = this.route.snapshot.data["place"] as Place; 
    this.placeId = this.route.snapshot.paramMap.get('id') || "";
    this.previousImages = this.curPlace[0].images;
    }
    ngAfterViewInit(){
      this.curForm = this.service.createEditForm(this.curPlace[0]);
      setTimeout(() =>{
          this.form?.setValue(this.curForm);
      }, 100)
    
    }
    ngOnDestroy(): void {
      this.$newPlace.unsubscribe();
    }
  }
  