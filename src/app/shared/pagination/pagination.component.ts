import { Component, Output,Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Output() newEvent = new EventEmitter<number>();
  @Input() num = 1; 
  @Input() maxPage: number = 10; 

  

  replacePage(value: number) {
    if(value < this.num && ( this.num - value) > 0 && value > 0){
    this.newEvent.emit(value);
  }
  if(value > this.num && value <= this.maxPage){
    this.newEvent.emit(value);
  }
  }
}
