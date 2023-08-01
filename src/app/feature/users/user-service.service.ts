import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { BASIC_URI } from 'src/app/constants';
import { Store } from '@ngrx/store';
import { User } from 'src/app/types/User';
import { UsersActions } from 'src/app/store/user.actions';
import { selectIsAuth, selectUserId, selectUserNickname, selectUserPlaces } from 'src/app/store/user.selectors';

@Injectable({
  providedIn: "any"
})
export class UserService {

  USER_BASIC_URI : string= `${BASIC_URI}/users`
  localUser : string | null = null;

  constructor(private http : HttpClient , private store : Store<{err : string , user : User}>) { }



registerUser(username : string,  password : string ){
  return this.http.post( `${this.USER_BASIC_URI}/register`, {username , password})
}
loginUser(username : string,  password : string ){
  return this.http.post( `${this.USER_BASIC_URI}/login`, {username , password})
}

logoutUser(userId : string) : void{
 this.http.post(`${this.USER_BASIC_URI}/logout` , {_id : userId}).subscribe(); 
 localStorage.removeItem("bookingUser");
 this.store.dispatch(UsersActions.remove()); 
}

getUserFromLS() : void {
  this.localUser =  localStorage.getItem(`bookingUser`); 
  if(!!this.localUser){
    this.store.dispatch(UsersActions.add({user : JSON.parse(this.localUser)}))
  }
}
addUserToLS(user : User) : void {
localStorage.setItem(`bookingUser` , JSON.stringify(user)); 
}

isAuth() : boolean{
 let isAuth : boolean = false;
  this.store.select(selectIsAuth).subscribe(res => {
    isAuth = res
  })

  return isAuth
}
getAuth(){
  return this.store.select(selectIsAuth);
}
getUserId(){
  return this.store.select(selectUserId);
}
getUserNickname(){
  return this.store.select(selectUserNickname);
}
addPlace(PlaceId : string){
  this.store.dispatch(UsersActions.addPlace({PlaceId}))
};
getPlaces(){
  return this.store.select(selectUserPlaces) 
}
}