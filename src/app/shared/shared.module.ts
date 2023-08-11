import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TripCardComponent } from './trip-card/trip-card.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { LinkComponent } from './link/link.component';
import { ButtonComponent } from './button/button.component';
import { ErrMesageComponent } from './err-mesage/err-mesage.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UploadPicturesComponent } from './upload-pictures/upload-pictures.component';



@NgModule({
  declarations: [
    TripCardComponent,
    SearchBoxComponent,
    LinkComponent,
    ButtonComponent,
    ErrMesageComponent,
    PaginationComponent,
    UploadPicturesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    TripCardComponent,
    SearchBoxComponent,
    LinkComponent,
    ButtonComponent,
    ErrMesageComponent,
    PaginationComponent,
    UploadPicturesComponent,
  ]
})
export class SharedModule { }
