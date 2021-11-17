import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProbaComponent } from './proba.component';
import { ProbaService } from "../proba/proba.service";


@NgModule({
  declarations: [ProbaComponent],
  imports: [
    SharedModule
  ],
  providers: [ProbaService]
})
export class ProbaModule { }
