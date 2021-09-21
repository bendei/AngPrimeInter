import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GyakorlasComponent } from "../gyakorlas/gyakorlas.component";
import { GyakorlasDatatsourceService } from "../gyakorlas/gyakorlas.datatsource";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [GyakorlasComponent],
  imports: [SharedModule, CommonModule],
  providers: [GyakorlasDatatsourceService]
})
export class GyakorlasModule { }
