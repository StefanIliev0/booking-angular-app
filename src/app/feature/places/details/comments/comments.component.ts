import { Component, ElementRef, Input , OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/feature/users/user-service.service';
import { PlaceService } from '../../place.service';
import { Subscription, max } from 'rxjs';
import { Comment } from 'src/app/types/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
@Input() isOwner = false;
@Input() userID = '';
@Input() placeID = '';
@ViewChild('newComment') newComment!: ElementRef; 
comments : Comment[] = [];
curComments : Comment[] = [];
$comments : Subscription = new Subscription; 
currentPage : number = 1 ;
maxPage : number = 10 ; 

constructor( private placeService : PlaceService){

}

addComment(){
  if(this.newComment?.nativeElement.value){
  this.placeService.addComment(this.newComment?.nativeElement.value , this.placeID);
  this.newComment.nativeElement.value = '';
}
}
changePage(page : number){
 this.currentPage = page; 
 this.curComments = this.comments.slice((page - 1) * 6 ,((page - 1) * 6) + 6 ).reverse()
}
deleteComment(commentId : string){
this.placeService.deleteComment(commentId , this.placeID)
}

editComment(commentId : string , commentText: string){
  this.deleteComment(commentId);
  this.newComment.nativeElement.value = commentText;
}
ngOnInit(): void {
      this.$comments = this.placeService.getComments().subscribe(x => {
      this.comments = [...x];
      if(this.comments.length > 0){
        this.comments = this.comments?.reverse()
      }
      this.maxPage = Math.ceil( this.comments.length / 6 );
      this.curComments = this.comments.length > 6 ? this.comments.slice(0,6) : this.comments;
    })
}
ngOnDestroy(): void {
  this.$comments.unsubscribe();
}
}
