import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() title = ''; 
  @Input() location = ''; 
  @Input() price = ""; 
  @Input() owner = ''; 
  @Input() img = '';
  @Input() _id = '';

}
