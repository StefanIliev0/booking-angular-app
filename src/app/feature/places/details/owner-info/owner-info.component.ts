import { Component ,Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/feature/users/user-service.service';
import { Book } from 'src/app/types/Book';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.css']
})
export class OwnerInfoComponent implements OnInit{
@Input() owner : any = {};
@Input() books : Book[] = []; 
@Input() PlaceId : string = ''; 
userId = '';
isOwner = false; 
nextBook : Book[] = []
removeplace = false; 

constructor(private userService : UserService , private placeService : PlaceService){
  userService.getUserId().subscribe(x => {
    this.userId = x; 
  })
}

ngOnInit(): void {
  if(this.owner._id === this.userId){
        this.isOwner = true ; 
  }
this.nextBook = this.placeService.getFurstBook(this.books);
}
//displays a message to confirm the owner wants to delete the property from the database
askForRemove(){
  this.removeplace = true; 
}
//hide a message for delete.
refuse(){
  this.removeplace = false; 
}
// delete place from DB.
removeThisPlace(){
 this.placeService.removePlace(this.PlaceId)
}

}
