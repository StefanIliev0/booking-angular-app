import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy{
  $user : Subscription = new Subscription;
  user! : User;
  constructor(private userService : UserService){

  }

  ngOnInit(): void {
    this.$user = this.userService.getUser().subscribe(x => {
      this.user = x ;
      console.log(this.user)
    })}
  ngOnDestroy(): void {
    this.$user.unsubscribe();
  }

}
