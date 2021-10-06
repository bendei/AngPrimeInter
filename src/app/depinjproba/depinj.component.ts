import { Component, OnInit, Self } from '@angular/core';
import { DepinjService } from './depinj.service';

@Component({
  selector: 'app-depinj',
  templateUrl: './depinj.component.html',
  styleUrls: ['./depinj.component.css']
})
export class DepinjComponent implements OnInit {

  constructor(private serv: DepinjService) {
    console.log(`inner:  ${this.serv.id}`);
   }

  ngOnInit(): void {
  }

}
