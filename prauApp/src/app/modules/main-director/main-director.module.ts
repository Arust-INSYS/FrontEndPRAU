import { NgModule } from "@angular/core";
import { MainDirectorComponent } from "./main-director.component";
import { CommonModule } from "@angular/common";
import { MainDirectorRoutingModule } from "./main-director-routing.module";
import { SharedDirectorModule } from "../shared-director.module";
import { HeaderDirectorModule } from "../header-director/header-director.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      MainDirectorComponent
    ],
    imports: [
      CommonModule,
      MainDirectorRoutingModule,
      SharedDirectorModule,
      HeaderDirectorModule,
      MatFormFieldModule,
      MatSelectModule,
      FormsModule,
    ]
  })
  export class MainDirectorModule { }