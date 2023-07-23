import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRouterModule } from './users-router.module';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from './user-service.service';
import { FormsModule } from '@angular/forms';


@NgModule({
 
  declarations: [
    LoginComponent,
    RegisterComponent
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
