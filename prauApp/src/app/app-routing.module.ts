import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULOS//
import { LoginComponent } from './components/Login/Login.component';
import { GestionarPersonaComponent } from './components/gestionar-persona/gestionar-persona.component';
import { ListarPersonaComponent } from './components/gestionar-persona/listar-persona/listar-persona.component';
import { RegistrarPersonaComponent } from './components/gestionar-persona/registrar-persona/registrar-persona.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'persona',
    component: GestionarPersonaComponent,
    children: [
      { path: 'listar', component: ListarPersonaComponent },
      { path: 'registrar', component: RegistrarPersonaComponent },
    ],
  },
  { path: 'menu', component: MenuComponent },
  { path: 'persona/listar', component: ListarPersonaComponent },
  {
    path: 'director',
    loadChildren:()=>
      import('./modules/director.module').then((m)=>m.DirectorModule)
 
  },
  { path: 'persona/registrar', component: RegistrarPersonaComponent },

  ///AGREGAR RUTAS SOBRE ESTO
  { path: '**', redirectTo: 'login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
