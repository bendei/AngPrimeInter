import {NgModule} from "@angular/core";
import { InputOutputParentComponent } from "../inputOutput-parent/inputOutputParent.component";
import { InputOutputFormComponent } from "../inputOutput-form/inputOutputForm.component";
import { InputOutputTableComponent } from "../table/inputOutputTable.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    imports: [SharedModule],
    declarations: [InputOutputParentComponent, InputOutputFormComponent, InputOutputTableComponent],
})
export class InputOutputModule {

}