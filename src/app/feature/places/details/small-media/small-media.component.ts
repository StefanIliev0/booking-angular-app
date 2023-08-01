import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceService } from '../../place.service';

@Component({
  selector: 'app-small-media',
  templateUrl: './small-media.component.html',
  styleUrls: ['./small-media.component.css']
})
export class SmallMediaComponent implements OnInit ,OnDestroy{
  activePic : string = "";
  allPics : string[] = [];
  otherPics : string[] = [];
  $pics : Subscription = new Subscription;
  constructor(private service : PlaceService){}

  ngOnInit(): void {
   this.$pics =  this.service.getPics().subscribe(pics => {
      if(pics && pics.length > 0){
      this.allPics = pics  ; 
      this.activePic = pics[0] ;
      this.otherPics = pics.filter(x => x !== this.activePic) 
    }})}
    
    changeActivePic ( pic : string){ 
      this.activePic = pic ; 
      this.otherPics = this.allPics.filter(x => x !== this.activePic); 
    };


    ngOnDestroy(): void {
      this.$pics.unsubscribe();
    }
}
