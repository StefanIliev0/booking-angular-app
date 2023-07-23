import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/feature/users/user-service.service';
import { UsersActions } from 'src/app/store/user.actions';
import { selectIsAuth, selectUserId } from 'src/app/store/user.selectors';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuth : boolean = false;
  userId : string = ""


  constructor(private store: Store<{user : User}> , private userService : UserService, private router : Router){
    this.store.select(selectIsAuth).subscribe(res => {
      this.isAuth = res
    })
    this.store.select(selectUserId).subscribe(res => {
      this.userId = res ;
    })
  }
   
  logout(event : Event) : void{
    this.userService.logoutUser(this.userId)
    this.router.navigate(["/login"])
  }
}
