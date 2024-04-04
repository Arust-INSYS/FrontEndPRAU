import { CommonModule } from "@angular/common";
import { TaskCompletComponent } from "./task-complet.component";
import { NgModule } from "@angular/core";
import { TaskCompletComponentRoutingModule } from "./task-complet-routing.module";

@NgModule({
    declarations: [
        TaskCompletComponent
    ],
    imports: [
      CommonModule,
      TaskCompletComponentRoutingModule,

 
    ],exports:[
        TaskCompletComponent
    ]
  })
  export class TaskCompletModule { }