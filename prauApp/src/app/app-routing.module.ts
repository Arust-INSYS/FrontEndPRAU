import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULOS//
import { LoginComponent } from './components/Login/Login.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
 /* { path: '**', redirectTo: 'login' },*/
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'criterios', component: CriteriosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
