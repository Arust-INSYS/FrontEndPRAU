import { NgModule } from "@angular/core";
import { HeaderDirectorComponent } from "./header-director.component";
import { CommonModule } from "@angular/common";
import { SharedDirectorModule } from "../shared-director.module";

@NgModule({
    declarations:[
        HeaderDirectorComponent
    ],
    imports:[
        CommonModule,
        SharedDirectorModule,
        
    ],exports:[
        HeaderDirectorComponent
    ]
})
export class HeaderDirectorModule{}