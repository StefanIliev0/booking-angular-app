import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {StoreModule} from "@ngrx/store"; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PlacesModule } from './feature/places/places.module';
import { UsersModule } from './feature/users/users.module';


import { userReducer } from './store/user.reducer';
import { ErrReducer } from './store/err.reducer';
import { FindReducer } from './store/find.reducer';


import { authInterseptorProvider } from './interceptors/auth.interseptor';
import { UserService } from './feature/users/user-service.service';
import { placeReducer } from './store/place.reducer';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({user : userReducer , err :  ErrReducer , find : FindReducer , place : placeReducer}),
    CoreModule,
    SharedModule,
    PlacesModule,
    UsersModule,
  ],
  providers : [authInterseptorProvider, UserService ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
