import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user-service.service';
import { Subscription } from 'rxjs';
import { Mesage } from 'src/app/types/Mesage';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnDestroy {
$messages : Subscription = new Subscription;
messages : Mesage[] = [];
$userId : Subscription = new Subscription;
userId : string = "";

constructor(private userService : UserService , private router : Router){
    this.$messages = this.userService.getMessages().subscribe(x => {
    this.messages = x ;
  })
    this.$userId = userService.getUserId().subscribe(x => {
      this.userId = x
    })
}

getNickcname(participants : {id : string , nickname : string}[]){
  let nickname = '';
  participants.forEach(x => {
    if(x.id !== this.userId){
      nickname = x.nickname;
    }
  })
  return nickname
}

getIsHaveNewMessages(messages : {read : boolean , user : string , mesage : string }[]){
let isNewM = 0; 
messages.forEach(x => {
  if( !x.read && x.user != this.userId){
    isNewM += 1; 
  }
})

return isNewM
}
needApproval(aproval : {approve : boolean , unapprove : boolean}){
  if(aproval.approve || aproval.unapprove){
    return false
  }
  return true
}
goToMessage(messageId : string){
  this.router.navigate(['/profile','messages',messageId]);
}

ngOnDestroy(): void {
  this.$messages.unsubscribe();
  this.$userId.unsubscribe();
}
}
