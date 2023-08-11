import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { HolydayTipsComponent } from './holyday-tips/holyday-tips.component';
import { WorkTripsComponent } from './work-trips/work-trips.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { isAuthGuard } from 'src/app/guards/is-auth.guard';
import { DetailsComponent } from './details/details.component';
import { placeResolver } from './place.resolver';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { isOwnerGuard } from 'src/app/guards/is-owner.guard';
import { ErrPageComponent } from 'src/app/core/err-page/err-page.component';

const routes: Routes = [
    {
    path:"holiday-trips/list",
    component: HolydayTipsComponent,
},
{
    path : "work-trips/list",
    component : WorkTripsComponent,
},
{
    path : "add-place" ,
    component :AddPlaceComponent,
    canActivate : [isAuthGuard()]
},
{
    path : "places/:id/details" ,
    component :DetailsComponent, 
    resolve : {place : placeResolver}
},
{
    path : "places/:id/edit" ,
    component :EditPlaceComponent, 
    resolve : {place : placeResolver},
    canActivate : [isAuthGuard() , isOwnerGuard()]
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
export class PlacesRouterModule { }
