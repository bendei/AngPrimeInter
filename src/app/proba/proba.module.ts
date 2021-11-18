import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProbaComponent } from './proba.component';
import { ProbaService } from "../proba/proba.service";
import { ChildComponent } from './child.component';


@NgModule({
  declarations: [ProbaComponent, ChildComponent],
  imports: [
    SharedModule
  ],
  providers: [ProbaService]
})
export class ProbaModule { }
