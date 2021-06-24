import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { InputOutputFormComponent } from "../inputOutput-form/inputOutputForm.component";
import { InputOutputParentComponent } from "../inputOutput-parent/inputOutputParent.component";
import { InputOutputTableComponent } from "../inputOutput-table/inputOutputTable.component";

const routes: Routes = [
    {path: "home", component: InputOutputParentComponent},
    {path: "form", component: InputOutputFormComponent},
    {path: "table", component: InputOutputTableComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class InputOutputRoutingModule {

}