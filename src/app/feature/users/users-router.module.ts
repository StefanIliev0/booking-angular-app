import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrPageComponent } from 'src/app/core/err-page/err-page.component';
import { isntAuthGuard } from 'src/app/guards/isnt-auth.guard';

const routes: Routes = [
    {
    path:"login",
    component: LoginComponent,
    canActivate : [isntAuthGuard()]
},
{
    path : "register",
    component : RegisterComponent,
    canActivate : [isntAuthGuard()]
},
{
  path:"**" ,
  pathMatch: "full" ,
  component : ErrPageComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRouterModule { }
