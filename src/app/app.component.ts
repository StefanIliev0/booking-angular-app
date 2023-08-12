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
    // It checks through the services whether there is any information saved in LocalStorage when the application is initialized, and if there is, it is saved with the store.
    this.userService.getUserFromLS();
    this.$user = this.userService.getUser().subscribe(x => {
      this.user[0] = x ;
      this.userService.addUserToLS(this.user[0] as User);
    })
    // The app component initializes a subscription to the router event. If there is a path change and there is a logged in user, it updates the user information. More specifically messages and reservations.
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
    // On destroy all subscription is unsubsribe.
  this.$user.unsubscribe();
  this.$routerEvent.unsubscribe(); 
  }
}
