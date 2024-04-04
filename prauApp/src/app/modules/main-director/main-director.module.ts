import { NgModule } from "@angular/core";
import { MainDirectorComponent } from "./main-director.component";
import { CommonModule } from "@angular/common";
import { MainDirectorRoutingModule } from "./main-director-routing.module";
import { SharedDirectorModule } from "../shared-director.module";
import { HeaderDirectorModule } from "../header-director/header-director.module";

@NgModule({
    declarations: [
      MainDirectorComponent
    ],
    imports: [
      CommonModule,
      MainDirectorRoutingModule,
      SharedDirectorModule,
      HeaderDirectorModule,
    ]
  })
  export class MainDirectorModule { }