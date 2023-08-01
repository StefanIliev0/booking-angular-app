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

    picItems : number[] = [1];
    fasilities : {fname : string , text : string , svg :{d : string , view : string}}[] = FASILITIES ; 
  constructor(private service : PlaceService , private router : Router , private userService : UserService){}


  addPicField(item : number){
    if(this.form?.value?.[`img-${item}`] && item == this.picItems.length){
      this.picItems = [...this.picItems , Number(item) + 1 ]
    }
  }

  async create (form : NgForm ){

    if(form.invalid ){
     return
    }
    this.$newPlace = this.service.createPlace(form).subscribe(res => {
      const newPlace = res as Place; 
      this.userService.addPlace(newPlace._id);
      this.router.navigate(['/places', newPlace._id , 'details']);
    } )
  }

  ngOnDestroy(): void {
    this.$newPlace.unsubscribe();
  }




}
