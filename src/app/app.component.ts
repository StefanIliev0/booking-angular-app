import { Component, OnInit } from '@angular/core';
import { UserService } from './feature/users/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'booking-angular-app';

  constructor (private userService : UserService){}


   ngOnInit()  {
    this.userService.getUserFromLS();
  }
}
