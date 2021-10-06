import { Component } from '@angular/core';
import { DepinjService } from './depinjproba/depinj.service';

@Component({
  selector: 'app',
  templateUrl: "./app.component.html",
  providers: [DepinjService]
})
export class AppComponent {
  title = 'SportStore';  
 
}
