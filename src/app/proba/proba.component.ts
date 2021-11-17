import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProbaService } from './proba.service';

@Component({
  selector: 'app-proba',
  templateUrl: './proba.component.html',
  styleUrls: ['./proba.component.css']
})
export class ProbaComponent implements OnInit {
  nevem: string;
  szam: number;
  $ob: Observable<number>;
  text: string;

  constructor(private ser: ProbaService) { }

  ngOnInit(): void {
    this.nevem = this.ser.nevem;
    
    this.$ob = of(999);
    
    this.$ob.subscribe({
      next:  data => console.log("elso", data)
    });

    this.$ob.subscribe({
      next: data => console.log("masodik", data)
    });

    this.asnycCall().then(result => console.log(result));
  }

  private async asnycCall(): Promise<void> {
    let prom = Promise.resolve("helloka");
    let result = await prom;

  } 

}
