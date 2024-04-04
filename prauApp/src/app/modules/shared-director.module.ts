import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { CalendarModule } from "primeng/calendar";

@NgModule({
    declarations:[],
    imports:[
        MatIconModule,
        CalendarModule,
        MatIconModule,
        MatFormFieldModule,
        CalendarModule,
        MatSelectModule,
    ],exports:[
        MatIconModule,
        CalendarModule,
        MatIconModule,
        MatFormFieldModule,
        CalendarModule,
        MatSelectModule,
    ]
})

export class SharedDirectorModule{}