import { RouterModule, Routes } from "@angular/router";
import { UseDirectorComponent } from "./use-director.component";
import { NgModule } from "@angular/core";

const routes:Routes=[{path:'',component : UseDirectorComponent}];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class UseDirectorRoutingModule{}