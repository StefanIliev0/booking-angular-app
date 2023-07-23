import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolydayTipsComponent } from './holyday-tips/holyday-tips.component';
import { WorkTripsComponent } from './work-trips/work-trips.component';
import { AddPlaceComponent } from './add-place/add-place.component';

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
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRouterModule { }
