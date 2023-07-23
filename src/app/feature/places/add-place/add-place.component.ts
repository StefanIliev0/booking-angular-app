import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PlaceService } from '../place.service';
import { Router } from '@angular/router';
import { Place } from 'src/app/types/Place';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {
    picItems : number[] = [1];
  constructor(private service : PlaceService , private router : Router){}

  AddMoreOne(item : number){
      this.picItems = [...this.picItems , Number(item) + 1 ]
  }

  async create (form : NgForm ){

    if(form.invalid ){
     return
    }

    this.service.createPlace(form).subscribe(res => {
      const newPlace = res as Place; 
      console.log(newPlace , newPlace._id)
      this.router.navigate(['/']);
    } )
  }






}
