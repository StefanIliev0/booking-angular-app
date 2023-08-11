import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './feature/users/user-service.service';
import { User } from './types/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit ,OnDestroy {
  title = 'booking-angular-app';
  user : User[] = [];
  $user : Subscription = new Subscription ; 
  $routerEvent : Subscription = new Subscription ; 

  constructor (private userService : UserService , private router : Router){

  }


   ngOnInit()  {
    this.userService.getUserFromLS();
    this.$user = this.userService.getUser().subscribe(x => {
      this.user[0] = x ;
      this.userService.addUserToLS(this.user[0] as User);
    })
    if(!!this.user[0]._id){
      this.$routerEvent =  this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if(!!this.user[0]._id){
          this.userService.updateUserData()
        }}
      });
    }
  }
  ngOnDestroy(): void {
  this.$user.unsubscribe();
  this.$routerEvent.unsubscribe(); 
  }
}
