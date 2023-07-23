import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {

@Input() text: String ="" ;
@Input() path?: String  ;


}
