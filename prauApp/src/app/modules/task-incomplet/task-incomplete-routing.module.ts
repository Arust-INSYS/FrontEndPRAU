import { RouterModule, Routes } from "@angular/router";
import { TaskIncompletComponent } from "./task-incomplet.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: TaskIncompletComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskCompletIncompletRoutingModule { }
