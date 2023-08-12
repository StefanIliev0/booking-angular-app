import { Component, ElementRef, OnDestroy, OnInit ,ViewChild } from '@angular/core';
import { UserService } from '../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/types/Place';
import { PlaceService } from '../../places/place.service';

@Component({
  selector: 'app-message',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessageComponent implements OnDestroy , OnInit{
  @ViewChild("newNessage") newNessage! : ElementRef
  messageId : string = "";
  $userPlaces : Subscription = new Subscription; 
  $messages : Subscription = new Subscription; 
  $userId : Subscription = new Subscription; 
  userPlaces : Place[] = [];
  userId :string = "" ;
  messagesItem : {read : boolean , user : string , mesage : string }[] = []; 
  viewMessages :  {read : boolean , user : string , mesage : string }[] = []; 
  num = 1 ;
  otherUserId : string = "";
  otherUserNickname : string = "";
  isOwner : boolean = false ;
  isApproval = false;
  forPlace :  { title: string,id: string,from: string ,to: string} = { title: '',id: '',from: '' ,to: ''}
constructor(private userService : UserService , private route : ActivatedRoute , private placeServise : PlaceService , private router : Router){
    this.messageId = this.route.snapshot.paramMap.get('messageId') || "";
    this.userService.readMessages(this.messageId);
}

incrementNum(){
  this.num += 1;
  this.viewMessages = this.messagesItem.length > this.num * 6 ? this.messagesItem.slice( this.num * -6) : this.messagesItem  
}
sendMessage(text : string){
  this.userService.sendMessage(text , this.messageId , this.otherUserId, this.userId );
  this.newNessage.nativeElement.value = "" ; 
  
}
approveBook(){
this.placeServise.makeBook(this.forPlace.from,this.forPlace.to,this.forPlace.id, this.otherUserId);
this.userService.aproveBook(this.userId , this.otherUserId , this.messageId);
this.userService.updateUserData();
this.router.navigate(['/profile','messages']);
}
unAproveBook(){
  this.userService.removeConversation( this.messageId);
   this.router.navigate(['/profile','messages']);
}
ngOnInit(): void {
  this.$userPlaces = this.userService.getPlaces().subscribe(x => {
    this.userPlaces = x; 
  })
    this.$userId = this.userService.getUserId().subscribe(x => {
      this.userId = x; 
    })

    this.$messages =  this.userService.getMessages().subscribe(x => {
      x?.forEach(y => {
        if(y._id == this.messageId){
          this.forPlace = y.forPlace ;
          if(y.approval.approve || y.approval.unapprove){

            this.isApproval = true; 
          }
          y.participants?.forEach(z => {
            if(z.id != this.userId){
              this.otherUserId = z.id; 
              this.otherUserNickname = z.nickname;
            }
          })
          this.userPlaces?.forEach( p => {
            if(p._id == y.forPlace.id){
              this.isOwner = true; 
            } 
          })
          this.messagesItem = y.mesages ; 
          this.viewMessages = this.messagesItem.length > 6 ? this.messagesItem.slice( this.num * -6) : this.messagesItem  ; 
        }
      })
    })
  }

ngOnDestroy(): void {
  this.$messages.unsubscribe();
  this.$userId.unsubscribe();
  this.$userPlaces.unsubscribe()
 } 

}
