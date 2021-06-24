import {NgModule} from "@angular/core";
import { InputOutputParentComponent } from "../inputOutput-parent/inputOutputParent.component";
import { InputOutputFormComponent } from "../inputOutput-form/inputOutputForm.component";
import { InputOutputTableComponent } from "../inputOutput-table/inputOutputTable.component";
import { SharedModule } from "../../shared/shared.module";
import { DatePipe } from "@angular/common";

@NgModule({
    imports: [SharedModule],
    declarations: [InputOutputParentComponent, InputOutputFormComponent, InputOutputTableComponent],
    providers: [DatePipe]
})
export class InputOutputModule {

}