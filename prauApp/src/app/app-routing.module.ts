import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULOS//
import { LoginComponent } from './components/Login/Login.component';
import { CriteriosComponent } from './components/criterios/criterios.component';

import { GestionarPersonaComponent } from './components/gestionar-persona/gestionar-persona.component';
import { ListarPersonaComponent } from './components/gestionar-persona/listar-persona/listar-persona.component';
import { RegistrarPersonaComponent } from './components/gestionar-persona/registrar-persona/registrar-persona.component';
import { MenuComponent } from './components/menu/menu.component';
import { CriteriosListarComponent } from './components/criterios-listar/criterios-listar.component';
import { ClasificacionCriteriosActualizarComponent } from './components/clasificacion-criterios-actualizar/clasificacion-criterios-actualizar.component';
import { ClasificacionCriteriosListarComponent } from './components/clasificacion-criterios-listar/clasificacion-criterios-listar.component';
import { ClasificacionCriteriosComponent } from './components/clasificacion-criterios/clasificacion-criterios.component';
import { CriteriosActualizarComponent } from './components/criterios-actualizar/criterios-actualizar.component';

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

  { path: 'criterios', component: CriteriosComponent },
   
  { path: 'criterios', component: CriteriosComponent},
  { path: 'criterios-listar', component: CriteriosListarComponent},
  { path: 'criterios-actualizar', component: CriteriosActualizarComponent},
  { path: 'clasificacion-criterios', component: ClasificacionCriteriosComponent},
  { path: 'clasificacion-criterios-actualizar', component:  ClasificacionCriteriosActualizarComponent},
  { path: 'clasificacion-criterios-actualizar/:id', component: ClasificacionCriteriosActualizarComponent },
  { path: 'criterios-actualizar/:id', component: CriteriosActualizarComponent },
  { path: 'clasificacion-criterios-listar', component: ClasificacionCriteriosListarComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'persona-listar', component: ListarPersonaComponent },
  { path: 'persona-registrar', component: RegistrarPersonaComponent },

  ///AGREGAR RUTAS SOBRE ESTO
  { path: '**', redirectTo: 'login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
