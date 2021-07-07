import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { VonatComponent } from "../../nyomonkovetes/tervezhetok/vonat.component";
import { MainviewComponent } from '../main/mainview.component';

@NgModule({
  imports: [SharedModule],
  declarations: [MainviewComponent, VonatComponent],
    
})
export class NyomonkovetesModule { }
