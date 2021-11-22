import { Component, OnInit } from '@angular/core';
import { DepService, counter } from './dep.service';

@Component({
  selector: 'dep-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  providers: [DepService]
})
export class ChildComponent implements OnInit {

  childcounter: number = 0;
  
  constructor(private servchild: DepService) { 
    this.childcounter = counter;
  }

  ngOnInit(): void {
  }

}
