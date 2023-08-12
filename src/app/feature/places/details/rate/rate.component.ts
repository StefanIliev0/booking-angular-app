import { Component , OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/feature/users/user-service.service';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit,OnDestroy  {
@Input() placeId : string = ""; 
@Input() ownerId : string = "" ; 
stars : number[] = [];
rating :number = 0 ; 
rate : number = 0 ; 
isVoted : boolean = false; 
userId : string = ""; 
currRate : number = 0 ; 
addRating : boolean = false; 

$userId : Subscription = new Subscription; 
$rate : Subscription = new Subscription; 

constructor( private userService : UserService , private placeService : PlaceService){
}

ngOnInit(): void {
  this.$userId = this.userService.getUserId().subscribe(x => {
    this.userId = x;
  })
this.setRating();
if(this.userId == this.ownerId){
  this.isVoted = true; 
}}
//modifies a variable to display the voting GUI.
addRatingFn(){
  this.addRating = true;
}
// saves and changes the current object rating
setRating(){
  this.$rate = this.placeService.getRate().subscribe(y =>{
    this.stars = [];
    this.rate = 0; 
    y?.forEach(x => {
      this.rate = this.rate + x.rate ;
      if( (this.userId && x.user === this.userId)){
        this.isVoted = true; 
      }
    })
   this.rate = this.rate / y.length  || 0; 
   this.rating = this.rate  ; 
    while(this.rating > 0){
    if(this.rating > 1){
      this.stars.push(1);
      this.rating = this.rating - 1 ;
    }
    if(this.rating <= 1){
      this.stars.push(this.rating);
      this.rating = 0; 
    }
  }  
  })

}
// modifies a variable that is passed when voting.
ChangeRate(rate : number){
  this.currRate = rate; 
}
// adds the selected rating to the rating of the specific object through the service
addRate(){
  this.placeService.addRate({ user : this.userId , rate : this.currRate}, this.placeId)
}

ngOnDestroy(): void {
  this.$rate.unsubscribe();
  this.$userId.unsubscribe();
}
}
