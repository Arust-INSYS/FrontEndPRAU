import { CommonModule } from "@angular/common";
import { UseDirectorComponent } from "./use-director.component";
import { NgModule } from "@angular/core";
import { HeaderDirectorModule } from "../header-director/header-director.module";
import { UseDirectorRoutingModule } from "./use-director-routing.module";

@NgModule({
    declarations:[
        UseDirectorComponent,
    ],
    imports:[
        UseDirectorRoutingModule,
        CommonModule,
        HeaderDirectorModule,
    ]
})

export class UseDirectorModule{}