import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './feature/feature.module';
import { HomeComponent } from './home/home.component';
import { HolydayTipsComponent } from './holyday-tips/holyday-tips.component';
import { WorkTripsComponent } from './work-trips/work-trips.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddPlaceComponent } from './add-place/add-place.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HolydayTipsComponent,
    WorkTripsComponent,
    LoginComponent,
    RegisterComponent,
    AddPlaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
