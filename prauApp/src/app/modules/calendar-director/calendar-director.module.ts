import { NgModule } from "@angular/core";
import { CalendarDirectorComponent } from "./calendar-director.component";
import { CommonModule } from "@angular/common";
import { FullCalendarModule } from "@fullcalendar/angular";

@NgModule({
    declarations:[
        CalendarDirectorComponent
    ],
    imports:[
        CommonModule,
        FullCalendarModule,
        
    ],exports:[
        CalendarDirectorComponent
    ]
})
export class CalendarDirectorModule{}