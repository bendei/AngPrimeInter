import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { VonatokComponent } from "../../nyomonkovetes/tervezheto/vonatok/vonatok.component";

@NgModule({
  imports: [SharedModule],
  declarations: [VonatokComponent],
    
})
export class NyomonkovetesModule { }
