import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProbaService } from './proba.service';

@Component({
  selector: 'app-proba',
  templateUrl: './proba.component.html',
  styleUrls: ['./proba.component.css'],
  providers: [ProbaService]
})
export class ProbaComponent implements OnInit {
  nevem: string;
  szam: number;
  $ob: Observable<number>;
  text: string;

  constructor(private ser: ProbaService) { }

  ngOnInit(): void {
  
  }

  private async asnycCall(): Promise<void> {
  
  } 

}
