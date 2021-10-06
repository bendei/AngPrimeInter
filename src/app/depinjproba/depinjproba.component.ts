import { Component, OnInit } from '@angular/core';
import { DepinjService } from './depinj.service';

@Component({
  selector: 'app-depinjproba',
  templateUrl: './depinjproba.component.html',
  styleUrls: ['./depinjproba.component.css'] 
})
export class DepinjprobaComponent implements OnInit {

  constructor(private serv: DepinjService) {
    console.log(`DepinjprobaComponent created : ${this.serv.id}`);
   }

  ngOnInit(): void {
  }

}
