import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/feature/users/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  isAuth : boolean = false; 
  $isAuth : Subscription = new Subscription; 
  constructor(private userService : UserService){}
  ngOnInit(): void {
   this.$isAuth = this.userService.getAuth().subscribe( x => {
      this.isAuth = x 
    })
  }
  ngOnDestroy(): void {
    this.$isAuth.unsubscribe()
  }
}
