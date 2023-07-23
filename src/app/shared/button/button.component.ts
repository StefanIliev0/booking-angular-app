import { Component, Output,Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Output() newEvent = new EventEmitter();
  @Input() text?: string; 
  

  onClick():void {
  this.newEvent.emit();
  }
}
