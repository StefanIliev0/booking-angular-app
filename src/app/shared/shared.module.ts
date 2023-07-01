import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from './trip-card/trip-card.component';
import { SearchBoxComponent } from './search-box/search-box.component';



@NgModule({
  declarations: [
    TripCardComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TripCardComponent,
    SearchBoxComponent
  ]
})
export class SharedModule { }
