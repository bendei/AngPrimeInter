import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { VonatComponent } from "../../nyomonkovetes/tervezhetok/vonat.component";
import { MainviewComponent } from '../main/mainview.component';
import { RISAzonositoConverterPipe } from "../../shared/RISAzonosito.converter";

@NgModule({
  imports: [SharedModule],
  declarations: [MainviewComponent, VonatComponent, RISAzonositoConverterPipe],
    
})
export class NyomonkovetesModule { }
