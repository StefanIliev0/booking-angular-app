import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../feature/users/user-service.service';
import { ErrPageComponent } from './err-page/err-page.component';
import { UsersModule } from '../feature/users/users.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersModule,
  ],
  providers :[UserService],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrPageComponent,
  ]
})
export class CoreModule { }
