import { RouterModule, Routes } from "@angular/router";
import { MainDirectorComponent } from "./main-director.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: MainDirectorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDirectorRoutingModule { }
