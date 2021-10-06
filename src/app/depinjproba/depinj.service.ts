import { Injectable } from '@angular/core';
import { DepinjModule } from './depinj.module';


let counter: number = 0;

@Injectable(
  {
    providedIn: DepinjModule,
    useClass: DepinjModule
    
  }
)
export class DepinjService {

id: number = 0;

  constructor() { 
    counter++;
    this.id = counter;
  }

}
