import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolydayTipsComponent } from './holyday-tips/holyday-tips.component';
import { WorkTripsComponent } from './work-trips/work-trips.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlacesRouterModule } from './places-router.module';
import { FormsModule } from '@angular/forms';
import { PlaceService } from './place.service';



@NgModule({
  declarations: [
    HolydayTipsComponent,
    WorkTripsComponent,
    AddPlaceComponent ],
  imports: [
    PlacesRouterModule,
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers : [PlaceService],
  exports :[
    HolydayTipsComponent,
    WorkTripsComponent,
    AddPlaceComponent 
  ]
})
export class PlacesModule { }
