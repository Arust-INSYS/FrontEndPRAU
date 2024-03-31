import { NgModule } from "@angular/core";
import { DirectorComponent } from "./director.component";
import { CommonModule } from "@angular/common";
import { DirectorRoutingModule } from "./director-routing.module";

@NgModule({
    declarations:[
        DirectorComponent
    ],
    imports:[
        CommonModule,
        DirectorRoutingModule,
    ]
})

export class DirectorModule{}