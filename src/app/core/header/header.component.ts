import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuth } from 'src/app/store/user.selectors';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuth : boolean = false;
  userId : string = ""


  constructor(private store: Store<{user : User}> ){
    this.store.select(selectIsAuth).subscribe(res => {
      this.isAuth = res
    })
  }
   
}
