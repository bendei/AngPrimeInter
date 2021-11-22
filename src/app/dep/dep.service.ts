import { Injectable } from '@angular/core';


let counter: number = 0;

@Injectable()
export class DepService {

  constructor() {
    ++counter;
    console.log(counter);
   }
}

export {  counter }