import { NgModule } from "@angular/core";
import { TaskIncompletComponent } from "./task-incomplet.component";
import { CommonModule } from "@angular/common";
import { TaskCompletIncompletRoutingModule } from "./task-incomplete-routing.module";

@NgModule({
    declarations: [
        TaskIncompletComponent
    ],
    imports: [
      CommonModule,
      TaskCompletIncompletRoutingModule,

    ],exports:[
        TaskIncompletComponent
    ]
  })
  export class TaskIncompletModule { }