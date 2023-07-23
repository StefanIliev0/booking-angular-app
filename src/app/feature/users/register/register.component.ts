import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from '../user-service.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/types/User';
import { UsersActions } from 'src/app/store/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

// currentUser$ = this.store.select(selectUserID).subscribe((res) => console.log(res))

constructor(private service : UserService , private  store : Store<{user : User }> , private router : Router ){
}

 async register(form : NgForm){

 if(form.invalid || form.value["password"] !== form.value["repeatPassword"]){
  return
 }

this.service.registerUser(form.value["username"], form.value["password"]).subscribe({
  next :(value) => {
  const user = value as User;
  this.store.dispatch(UsersActions.add({user}));
  this.service.addUserToLS(user);
  this.router.navigate(['/']);
  }
})


}
}
