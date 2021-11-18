import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProbaComponent } from './proba.component';
import { ProbaModule } from './proba.module';

@Injectable()
export class ProbaService {

  nevem: string = "bende";
  $obs: Observable<number>;

  constructor() { }

  callMe(): Observable<number> {
    return this.$obs = of(222);

  }
}
