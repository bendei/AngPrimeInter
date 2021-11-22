import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepComponent } from '../dep/dep.component';
import { ChildComponent } from './child.component';


@NgModule({
  declarations: [DepComponent, ChildComponent],
  imports: [
    CommonModule
  ]
})
export class DepModule { }
