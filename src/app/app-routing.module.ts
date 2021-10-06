import { NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { StoreGuard } from "./authentication/store.guard";
import { AuthComponent } from "./authentication/auth.component";
import { ErrorComponent } from "./error/error.component";
import {GyakorlasComponent } from "../app/gyakorlas/gyakorlas.component";
import { DepinjprobaComponent } from "./depinjproba/depinjproba.component";

//Routendefinitionen
const routes: Routes = [
    {path: "error", component: ErrorComponent},
    {path: "auth", component: AuthComponent},
    {path: "home", component: HomeComponent , canActivate: [StoreGuard]},
    {path: "gyakorlas/main", component: GyakorlasComponent},
    {path: "depinjproba", component: DepinjprobaComponent},
    {path: "store", // ez lesz a route prefix-je pl "/store/home"
        //  <!-- a children routok componentjeit ide tölti be: <router-outlet></router-outlet> "admin", lásd: admin module path main 
        loadChildren: () => import("./store/store-routing.module").then(m => m.StoreRoutingModule)
        , canActivate: [StoreGuard]},
    {path: "book",
      loadChildren: () => import("./book/book-routing.module").then(a => a.BookRoutingModule)
      , canActivate: [StoreGuard]
    },
    {path: "inputoutput",
      loadChildren: () => import("./inputOutput/shared/inputoutput-routing.module").then(i => i.InputOutputRoutingModule)
    },
    {path: "nyomonkovetes",
      loadChildren: () => import("./nyomonkovetes/shared/nyomonkovetes-routing.module").then(i => i.NyomonkovetesRoutingModule)
    },
    
    // !!! a ** pathnak kell legutoljára jönnie különben az alatta levő path nem mux
    {path: "**", redirectTo: "home"}  // um die Navigation zu nicht bekannten URLs aubzufangen
   
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
    
}