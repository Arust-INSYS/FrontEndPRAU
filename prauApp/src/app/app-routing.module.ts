import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULOS//
import { LoginComponent } from './components/Login/Login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: 'login' },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'sidenav', component: SidenavComponent},
  { path: 'menu', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
