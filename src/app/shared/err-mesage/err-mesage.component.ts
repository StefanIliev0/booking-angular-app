import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectErr } from 'src/app/store/err.selector';
@Component({
  selector: 'app-err-message',
  templateUrl: './err-mesage.component.html',
  styleUrls: ['./err-mesage.component.css']
})
export class ErrMesageComponent {
err = this.store.select(selectErr); 
constructor(private store : Store<{err : string}>){

}


}
