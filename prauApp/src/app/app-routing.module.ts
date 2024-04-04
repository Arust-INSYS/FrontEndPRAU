import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULOS//
import { LoginComponent } from './components/Login/Login.component';
import { GestionarPersonaComponent } from './components/gestionar-persona/gestionar-persona.component';
import { ListarPersonaComponent } from './components/gestionar-persona/listar-persona/listar-persona.component';
import { MenuComponent } from './components/menu/menu.component';
import { CriteriosListarComponent } from './components/criterios-listar/criterios-listar.component';
import { ClasificacionCriteriosActualizarComponent } from './components/clasificacion-criterios-actualizar/clasificacion-criterios-actualizar.component';
import { ClasificacionCriteriosListarComponent } from './components/clasificacion-criterios-listar/clasificacion-criterios-listar.component';
import { ClasificacionCriteriosComponent } from './components/clasificacion-criterios/clasificacion-criterios.component';
import { CriteriosActualizarComponent } from './components/criterios-actualizar/criterios-actualizar.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { ContenidoCriteriosComponent } from './components/contenido-criterios/contenido-criterios.component';
import { ContenidoPersonaComponent } from './components/contenido-persona/contenido-persona.component';
import { RegistrarPersonaComponent } from './components/gestionar-persona/registrar-persona/registrar-persona.component';
import { EvaluacionCriteriosComponent } from './components/evaluacion-criterios/evaluacion-criterios.component';
import { EvaluacionCriteriosCalificarComponent } from './components/evaluacion-criterios-calificar/evaluacion-criterios-calificar.component';
import { ContenidoCalificacionComponent } from './components/contenido-calificacion/contenido-calificacion.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { CalificacionListarComponent } from './components/calificacion-listar/calificacion-listar.component';
import { CalificacionActualizarComponent } from './components/calificacion-actualizar/calificacion-actualizar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarPersonaComponent },
  {
    path: 'evaluacion-criterios',
    component: EvaluacionCriteriosComponent,
  },
  {
    path: 'evaluacion-criterios-calificar',
    component: EvaluacionCriteriosCalificarComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'contenido-persona',
        component: ContenidoPersonaComponent,
        children: [
          { path: 'registrar-persona', component: RegistrarPersonaComponent },
          { path: 'listar-persona', component: ListarPersonaComponent },
        ],
      },
      {
        path: 'contenido-calificacion',
        component: ContenidoCalificacionComponent,
        children: [
          {
            path: 'calificacion-listar',
            component: CalificacionListarComponent,
          },
          { path: 'calificacion', component: CalificacionComponent },
          {
            path: 'calificacion-actualizar/:id',
            component: CalificacionActualizarComponent,
          },
        ],
      },

      {
        path: 'contenido-criterios',
        component: ContenidoCriteriosComponent,
        children: [
          {
            path: 'clasificacion-criterios',
            component: ClasificacionCriteriosComponent,
          },
          {
            path: 'clasificacion-actualizar/:id',
            component: ClasificacionCriteriosActualizarComponent,
          },
          {
            path: 'clasificacion-listar',
            component: ClasificacionCriteriosListarComponent,
          },
          {
            path: 'criterios',
            component: CriteriosComponent,
          },
          {
            path: 'criterios-actualizar/:id',
            component: CriteriosActualizarComponent,
          },
          {
            path: 'criterios-listar',
            component: CriteriosListarComponent,
          },
        ],
      },
    ],
  },

  ///AGREGAR RUTAS SOBRE ESTO
  { path: '**', redirectTo: 'login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
