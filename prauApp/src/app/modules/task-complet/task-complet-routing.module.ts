import { RouterModule, Routes } from "@angular/router";
import { TaskCompletComponent } from "./task-complet.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: TaskCompletComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskCompletComponentRoutingModule { }
