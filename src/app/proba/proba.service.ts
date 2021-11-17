import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProbaService {

  nevem: string = "bende";
  $obs: Observable<number>;

  constructor() { }

  callMe(): Observable<number> {
    return this.$obs = of(222);

  }
}
