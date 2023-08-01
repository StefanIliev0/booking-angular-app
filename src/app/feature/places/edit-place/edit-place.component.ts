import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

import { PlaceService } from '../place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/types/Place';
import { FASILITIES } from 'src/app/constants';
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
  curPlace : Place[] = [];
  placeId : string = '';
  curForm = {};
  picItems : number[] = [1];
  fasilities : {fname : string , text : string , svg :{d : string , view : string}}[] = FASILITIES ; 
      

    constructor(private service : PlaceService , private router : Router , private userService : UserService , private route : ActivatedRoute){

    }
  
  
    addPicField(item : number){
      if(this.form?.value?.[`img-${item}`] && item == this.picItems.length){
        this.picItems = [...this.picItems , Number(item) + 1 ]
      }
    }
  
    async edit (form : NgForm ){
  
      if(form.invalid ){
       return
      }
  
      this.$newPlace = this.service.editPlace(form , this.placeId ).subscribe(res => {
        const editPlace = res as Place; 
      } )
        this.router.navigate([`/places/${this.placeId}/details/`]);
    }
    ngOnInit(): void { 
    this.curPlace[0] = this.route.snapshot.data["place"] as Place; 
    this.placeId = this.route.snapshot.paramMap.get('id') || "";
    this.curPlace[0].images.forEach((x , i ) => {
      if( i !== 0 ){
        this.picItems = [...this.picItems , i + 1]
      }
    })
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
  