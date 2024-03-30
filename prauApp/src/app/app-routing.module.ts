import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULOS//
import { LoginComponent } from './components/Login/Login.component';
import { GestionarPersonaComponent } from './components/gestionar-persona/gestionar-persona.component';
import { ListarPersonaComponent } from './components/gestionar-persona/listar-persona/listar-persona.component';
import { RegistrarPersonaComponent } from './components/gestionar-persona/registrar-persona/registrar-persona.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: 'login' },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'persona',
    component: GestionarPersonaComponent,
    children: [
      { path: 'listar', component: ListarPersonaComponent },
      { path: 'registrar', component: RegistrarPersonaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
