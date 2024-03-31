import { RouterModule, Routes } from "@angular/router";
import { HeaderDirectorComponent } from "./header-director.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: '', component: HeaderDirectorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalizationDetailsRoutingModule { }
