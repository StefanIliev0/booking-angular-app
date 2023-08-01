import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolydayTipsComponent } from './holyday-tips/holyday-tips.component';
import { WorkTripsComponent } from './work-trips/work-trips.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlacesRouterModule } from './places-router.module';
import { FormsModule } from '@angular/forms';
import { PlaceService } from './place.service';
import { DetailsComponent } from './details/details.component';
import { SmallMediaComponent } from './details/small-media/small-media.component';
import { RateComponent } from './details/rate/rate.component';
import { OwnerInfoComponent } from './details/owner-info/owner-info.component';
import { ReservationComponent } from './details/reservation/reservation.component';
import { CommentsComponent } from './details/comments/comments.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';



@NgModule({
  declarations: [
    HolydayTipsComponent,
    WorkTripsComponent,
    AddPlaceComponent,
    DetailsComponent,
    SmallMediaComponent,
    RateComponent,
    OwnerInfoComponent,
    ReservationComponent,
    CommentsComponent,
    EditPlaceComponent,
   ],
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
