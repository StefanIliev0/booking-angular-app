import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from '../user-service.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/types/User';
import { UsersActions } from 'src/app/store/user.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(private service : UserService , private  store : Store<{user : User}>, private router : Router){
}

async login(form : NgForm){

  if(form.invalid ){
    this.service.addErr("Sorry , but something in your fields isn't right.");
   return
  }
 
  this.service.loginUser(form.value["username"], form.value["password"]).subscribe({
    next :(value) => {
    const user = value as User;
    this.store.dispatch(UsersActions.add({user}));
    this.service.addUserToLS(user);
    this.router.navigate(['/']);
    }
  })
}}
