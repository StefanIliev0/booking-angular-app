import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRouterModule } from './users-router.module';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from './user-service.service';
import { FormsModule } from '@angular/forms';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './messages/messages.component';


@NgModule({
 
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileDetailsComponent,
    ProfileEditComponent,
    MessageListComponent, 
    MessageComponent
  ],
  imports: [
    CommonModule,
    UsersRouterModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers :[UserService],
})

export class UsersModule { }
