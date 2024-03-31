import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DirectorComponent } from "./director.component";

const routes: Routes = [
    {
        path: '', component: DirectorComponent,
        children: [
            {
                path: 'main',
                loadChildren: () =>
                  import('./main-director/main-director.module').then(
                    (m) => m.MainDirectorModule
                  ),
            },
            {
                path: 'use',
                loadChildren: () =>
                  import('./use-director/use-director.module').then(
                    (m) => m.UseDirectorModule
                  ),
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DirectorRoutingModule { }