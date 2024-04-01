import { CommonModule } from "@angular/common";
import { UseDirectorComponent } from "./use-director.component";
import { NgModule } from "@angular/core";
import { HeaderDirectorModule } from "../header-director/header-director.module";
import { UseDirectorRoutingModule } from "./use-director-routing.module";
import { CalendarDirectorModule } from "../calendar-director/calendar-director.module";
import { TaskCompletModule } from "../task-complet/task-complet.module";
import { TaskIncompletModule } from "../task-incomplet/task-incomplet.module";

@NgModule({
    declarations:[
        UseDirectorComponent,
    ],
    imports:[
        UseDirectorRoutingModule,
        CommonModule,
        HeaderDirectorModule,
        CalendarDirectorModule,
        TaskCompletModule,
        TaskIncompletModule,
    ]
})

export class UseDirectorModule{}