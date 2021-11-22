import { Component, OnInit } from '@angular/core';
import { DepService } from '../dep/dep.service';
import { counter } from '../dep/dep.service';

@Component({
  selector: 'app-dep',
  templateUrl: './dep.component.html',
  styleUrls: ['./dep.component.css'],
  providers: [DepService]
})
export class DepComponent implements OnInit {

  compcounter: number = counter;

  constructor(private serv: DepService) { }

  ngOnInit(): void {
  }

}
