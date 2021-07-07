import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { MainviewComponent } from "../../nyomonkovetes/main/mainview.component";

const routes: Routes = [
     {path: "main", component: MainviewComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class NyomonkovetesRoutingModule {

}