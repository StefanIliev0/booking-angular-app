import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { BASIC_URI } from 'src/app/constants';
import { Store } from '@ngrx/store';
import { User } from 'src/app/types/User';
import { UsersActions } from 'src/app/store/user.actions';
import { selectIsAuth, selectUser, selectUserId, selectUserMessages, selectUserNickname, selectUserPlaces } from 'src/app/store/user.selectors';
import { ErrActions } from 'src/app/store/err.actions';
import { Subscription } from 'rxjs';
import { Mesage } from 'src/app/types/Mesage';
import { UserBook } from 'src/app/types/UserBook';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "any"
})
export class UserService {

  USER_BASIC_URI : string= `${BASIC_URI}/users`
  localUser : string | null = null;

  constructor(private http : HttpClient , private store : Store<{err : string , user : User}> , private router : Router) { }



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
getMessages(){
  return this.store.select(selectUserMessages);
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
};
getUser(){
  return this.store.select(selectUser)
}
editUser (user :{nickname  : string ,about : string ,profilePicture : string , _id : string}){
  this.store.dispatch(UsersActions.updateUser({userInfo : user})); 
  return this.http.patch(`${this.USER_BASIC_URI}/${user._id}/update` ,  user)
}
createEditForm (user : User){
  return {nickname  : user.nickname ,about : user.about }
}
addErr(text : string){
  this.store.dispatch(ErrActions.add({err : text}))
  setTimeout(() => {
    this.store.dispatch(ErrActions.remove())
  },3000)
}
addConversation(ownerId :string , from:string , to:string, placeId:string , title:string){
  let $Req : Subscription = new Subscription ;
  let req : Mesage[] = [];
  $Req = this.http.post(`${this.USER_BASIC_URI}/${ownerId}/addConversation` , {title , placeId , from , to }).subscribe(x => { 
  req[1] = x as Mesage;
this.store.dispatch(UsersActions.addConv({message : req[1]}));
  $Req.unsubscribe();
  })}
removeConversation(convId : string){
    let $req :Subscription = new Subscription;
    $req = this.http.delete(`${this.USER_BASIC_URI}/messages/${convId}`).subscribe(x => {
        $req.unsubscribe();
    })
  }
aproveBook(userOneId : string , userTwoId : string, conversationId : string){
  let $req :Subscription = new Subscription;
  $req = this.http.patch(`${this.USER_BASIC_URI}/messages/${conversationId}/approve` , { userOneId , userTwoId}).subscribe(x => {
    this.updateUserData();
    $req.unsubscribe();
  })
}
sendMessage(text : string , messageId : string , otherUserId : string , userId : string  ){
let $req : Subscription = new Subscription;
$req = this.http.post(`${this.USER_BASIC_URI}/messages/${messageId}` , {text, otherUserId , userId}).subscribe(x => { 
this.store.dispatch(UsersActions.addMessage({message :text , messageId , userId }));
$req.unsubscribe();
  })
}
updateUserData(){
  let $req : Subscription = new Subscription;
  $req =  this.http.get(`${this.USER_BASIC_URI}/userData`).subscribe(x => {
  const newData = x as {books : UserBook[] , mesages : Mesage[]};
  this.store.dispatch(UsersActions.updateUserData(newData)); 
  $req.unsubscribe(); 
  })
}
readMessages(messageId:string){
  let $req : Subscription = new Subscription;
  this.store.dispatch(UsersActions.readMessages({messageId})); 
  $req =  this.http.post(`${this.USER_BASIC_URI}/messages/${messageId}/read`, {}).subscribe(x => {
  $req.unsubscribe(); 
  })
}
getNewMessages(messages : Mesage[]){
  let num = 0 ;
  messages?.forEach(x => {
    if(x.mesages.find(y => y.read == false)){
      num += 1;
    }
  })
  return num
}
uploadProfilePic(pic : File){
  let $req : Subscription = new Subscription;
  $req =  this.http.post(`${BASIC_URI}/images/${pic.name}` , {pic}).subscribe(x => {
  $req.unsubscribe(); 
  })
  return `${BASIC_URI}/image/${pic.name}`
}
deleteProfilePic(pic : string){
  if(pic.startsWith(BASIC_URI)){
    let $req : Subscription = new Subscription; 
    $req = this.http.delete(pic).subscribe(x =>{
        $req.unsubscribe();
    }) ;
  }
}
}