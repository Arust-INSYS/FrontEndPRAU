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
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { CalificacionListarComponent } from './components/calificacion-listar/calificacion-listar.component';
import { CalificacionActualizarComponent } from './components/calificacion-actualizar/calificacion-actualizar.component';
import { AsignaturaComponent } from './components/asignatura/asignatura.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { AnalisisUsoComponent } from './components/analisis-uso/analisis-uso.component';
import { ListarPeriodosAcComponent } from './components/gestion-periodo-academico/listar-periodos-ac/listar-periodos-ac.component';
import { RegistrarPeriodoAcComponent } from './components/gestion-periodo-academico/registrar-periodo-ac/registrar-periodo-ac.component';
import { RegistrarAulaComponent } from './components/gestion-aula/registrar-aula/registrar-aula.component';
import { ListarAulasComponent } from './components/gestion-aula/listar-aulas/listar-aulas.component';
import { ActualizarPeriodoAcComponent } from './components/gestion-periodo-academico/actualizar-periodo-ac/actualizar-periodo-ac.component';
import { ActualizarAulaComponent } from './components/gestion-aula/actualizar-aula/actualizar-aula.component';
import { ListarRolComponent } from './components/gestionar-rol/listar-rol/listar-rol.component';
import { RegistrarRolComponent } from './components/gestionar-rol/registrar-rol/registrar-rol.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { ContenidoVirtualComponent } from './components/contenido-virtual/contenido-virtual.component';
import { CarreraListarComponent } from './components/carrera-listar/carrera-listar.component';
import { AsignaturaListarComponent } from './components/asignatura-listar/asignatura-listar.component';
import { ContenidoAnaliticsComponent } from './components/contenido-analitics/contenido-analitics.component';
import { CarreraActualizarComponent } from './components/carrera-actualizar/carrera-actualizar.component';
import { AsignaturaActualizarComponent } from './components/asignatura-actualizar/asignatura-actualizar.component';
import { MainDirectorComponent } from './modules/main-director/main-director.component';
import { UseDirectorComponent } from './modules/use-director/use-director.component';
import { PrincipalDirectorComponent } from './components/principal-director/principal-director.component';
import { AnalisisUsoCarreraComponent } from './components/analisis-uso-carrera/analisis-uso-carrera.component';
import { AnalisisGraficaDocenteComponent } from './components/analisis-grafica-docente/analisis-grafica-docente.component';
import { ActualizarRolComponent } from './components/actualizar-rol/actualizar-rol.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main-director', component: MainDirectorComponent},
  { path: 'use-director', component: UseDirectorComponent },
  {
    path: 'menu', component: MenuComponent,
    children: 
    [
      {
        path: 'contenido-persona', component: ContenidoPersonaComponent,
        children: 
        [
          { path: 'registrar-persona', component: RegistrarPersonaComponent },
          { path: 'listar-persona', component: ListarPersonaComponent },
          { path: 'listar-rol', component: ListarRolComponent },
          { path: 'registrar-rol', component: RegistrarRolComponent },
          { path: 'listar-usuarios', component: ListarUsuarioComponent },
          { path: 'actualizar-rol/:id', component: ActualizarRolComponent}

        ],
      },

      {
        path: 'contenido-criterios', component: ContenidoCriteriosComponent,
        children: 
        [
          { path: 'clasificacion-criterios', component: ClasificacionCriteriosComponent },
          { path: 'clasificacion-actualizar/:id', component: ClasificacionCriteriosActualizarComponent },
          { path: 'clasificacion-listar', component: ClasificacionCriteriosListarComponent },
          { path: 'criterios', component: CriteriosComponent },
          { path: 'criterios-actualizar/:id', component: CriteriosActualizarComponent },
          { path: 'criterios-listar', component: CriteriosListarComponent },
          { path: 'criterios-evaluacion', component: EvaluacionCriteriosComponent },
          { path: 'criterios-evaluacion-calificacion/:status', component: EvaluacionCriteriosCalificarComponent },
          { path: 'criterios-evaluacion-calificacion/:status/:id', component: EvaluacionCriteriosCalificarComponent },
          { path: 'listar-calificacion', component: CalificacionListarComponent },
          { path: 'calificacion', component: CalificacionComponent },
          { path: 'calificacion-actualizar/:id', component: CalificacionActualizarComponent },
        ],
      },

      {
        path: 'contenido-virtual', component: ContenidoVirtualComponent,
        children: 
        [
          { path: 'carrera', component: CarreraComponent },
          { path: 'carrera-listar', component: CarreraListarComponent },
          { path: 'carrera-actualizar/:id', component: CarreraActualizarComponent },
          { path: 'asignatura', component: AsignaturaComponent },
          { path: 'asignatura-listar', component: AsignaturaListarComponent },
          { path: 'asignatura-actualizar/:id', component: AsignaturaActualizarComponent },
          { path: 'listar-periodo', component: ListarPeriodosAcComponent },
          { path: 'registrar-periodo', component: RegistrarPeriodoAcComponent },
          { path: 'actualizar-periodo/:id', component: ActualizarPeriodoAcComponent},
          { path: 'listar-aulas', component: ListarAulasComponent },
          { path: 'principal-director', component: PrincipalDirectorComponent },
          { path: 'registrar-aula', component: RegistrarAulaComponent },
          { path: 'actualizar-aula/:id', component: ActualizarAulaComponent },
        ],
      },

      {
        path: 'contenido-analitics', component: ContenidoAnaliticsComponent,
        children: 
        [
          { path: 'analisis-uso', component: AnalisisUsoComponent},
          { path: 'analisis-uso-carrera', component: AnalisisUsoCarreraComponent},
          //{ path: 'analisis-uso-docente', component: AnalisisUsoComponent},
          //{ path: 'analisis-uso-carrera', component: AnalisisUsoComponent},
          { path: 'analisis-uso-docente', component: AnalisisGraficaDocenteComponent},

          //{ path: 'analisis-uso-asignatura', component: AnalisisUsoComponent},
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
