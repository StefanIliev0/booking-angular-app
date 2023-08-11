import { Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import {trigger,state,style,animate, transition} from '@angular/animations';
import { Mesage } from 'src/app/types/Mesage';
@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css'],
  animations : [
    trigger('openClose', [
      state('open', style({
        height: '210px',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('closed', style({
        height: 0,
        opacity: 0,
        overflow: 'hidden'
        
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class UserControlComponent implements OnInit,OnDestroy{
  $messages : Subscription = new Subscription;
  $userId : Subscription = new Subscription;
  messages : Mesage[] = []; 
  newMesages : number = 0;
  userId : string = "";
  isShort = false;

  constructor(private userService : UserService, private router : Router){}

  logout() : void{
    this.userService.logoutUser(this.userId)
    this.$userId.unsubscribe();
    this.$messages.unsubscribe();
    this.router.navigate(["/login"])
  }
  open(){
    this.isShort = true; 
  }

  close(){
    this.isShort = false;
  }
ngOnInit(): void {
    this.$userId = this.userService.getUserId().subscribe(x => {
      this.userId = x ;
    })
    this.$messages = this.userService.getMessages().subscribe(x => {
      if(x?.length > 0){
      this.messages = [...x] ;
      this.newMesages = this.userService.getNewMessages(this.messages); }
    })
}

ngOnDestroy(): void {
  this.$userId.unsubscribe();
  this.$messages.unsubscribe();
}
}
