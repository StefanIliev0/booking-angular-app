import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrPageComponent } from 'src/app/core/err-page/err-page.component';
import { isntAuthGuard } from 'src/app/guards/isnt-auth.guard';
import { isAuthGuard } from 'src/app/guards/is-auth.guard';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './messages/messages.component';

const routes: Routes = [
    {
    path:"login",
    component: LoginComponent,
    canActivate : [isntAuthGuard()]
},{
    path : "register",
    component : RegisterComponent,
    canActivate : [isntAuthGuard()]
},{
    path : "profile/details",
    component : ProfileDetailsComponent,
    pathMatch: "full" ,
    canActivate : [isAuthGuard()]
},{
    path : "profile/edit",
    component : ProfileEditComponent,
    pathMatch: "full" ,
    canActivate : [isAuthGuard()]
},{
    path : "profile/messages",
    component : MessageListComponent,
    pathMatch: "full" ,
    canActivate : [isAuthGuard()]
},{
    path : "profile/messages/:messageId",
    component : MessageComponent,
    pathMatch: "full" ,
    canActivate : [isAuthGuard()]
},
// {
//   path:"**" ,
//   pathMatch: "full" ,
//   component : ErrPageComponent
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRouterModule { }
