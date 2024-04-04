import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarDirectorComponent } from "./calendar-director.component";

const routes: Routes = [{ path: '', component: CalendarDirectorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarDirectorRoutingModule { }