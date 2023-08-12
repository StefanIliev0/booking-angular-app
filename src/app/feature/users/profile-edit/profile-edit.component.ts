import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../users/user-service.service';
import { User } from 'src/app/types/User';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnDestroy,OnInit  {
  @ViewChild('form') form! : NgForm;
  $user :Subscription = new Subscription;
  $editUser :Subscription = new Subscription;
  files : File[] = [] ;  
  user : User[] = [];
  isUri : boolean = false; 
  curForm = {};
  profilePic : string = "";
  remove : boolean = false
      

    constructor( private router : Router , private userService : UserService ){

    }
    ShowDelete(){
      this.remove= true; 
    }
    hideDelete(){
      setTimeout(( ) => {
        this.remove = false; 
      }, 100)
    }
    removePic(){
      this.profilePic = ""
    }
     changeGetPictureMethod(){
      this.isUri = !this.isUri;
      this.form.value["profilePicture"] = "";
      this.files = []; 
    }
    setFiles(images : File[]){
      this.files = images;
    }
    async edit (form : NgForm ){
  
      if(form.invalid ){
        
        this.userService.addErr("Sorry , but something in your fields isn't right.");
       return
      }
      if(form.value["profilePicture"]){
        this.profilePic = form.value["profilePicture"]; 
      }
      if(this.files[0]){
        this.profilePic = this.userService.uploadProfilePic(this.files[0]); 
      }
      this.$editUser = this.userService.editUser({...this.form.value , profilePicture :this.profilePic , _id : this.user[0]._id } ).subscribe(res => {
        const editUser= res ; 
      } )
        this.router.navigate([`/profile/details`]);
    }
    ngOnInit(): void { 
    this.$user = this.userService.getUser().subscribe(x => {
      this.user[0] = x; 
    })
    }
    ngAfterViewInit(){
      this.curForm = this.userService.createEditForm(this.user[0]);
      this.profilePic = this.user[0].profilePicture; 
      setTimeout(() =>{
          this.form?.setValue(this.curForm);
      }, 100)
    }
    ngOnDestroy(): void {
      this.$editUser.unsubscribe();
      this.$user.unsubscribe();
    }
  
  
  
  
  }
  