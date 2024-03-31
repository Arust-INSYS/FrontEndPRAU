import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//MODULOS//
import { LoginComponent } from './components/Login/Login.component';
import { GestionarPersonaComponent } from './components/gestionar-persona/gestionar-persona.component';
import { ListarPersonaComponent } from './components/gestionar-persona/listar-persona/listar-persona.component';
import { RegistrarPersonaComponent } from './components/gestionar-persona/registrar-persona/registrar-persona.component';
import { MenuComponent } from './components/menu/menu.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { ClasificacionCriteriosComponent } from './components/clasificacion-criterios/clasificacion-criterios.component';
import { ContenidoCriteriosComponent } from './components/contenido-criterios/contenido-criterios.component';
import { ClasificacionCriteriosActualizarComponent } from './components/clasificacion-criterios-actualizar/clasificacion-criterios-actualizar.component';
import { ClasificacionCriteriosListarComponent } from './components/clasificacion-criterios-listar/clasificacion-criterios-listar.component';
import { CriteriosActualizarComponent } from './components/criterios-actualizar/criterios-actualizar.component';
import { CriteriosListarComponent } from './components/criterios-listar/criterios-listar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listar', component: ListarPersonaComponent },
  //{ path: 'registrar', component: RegistrarPersonaComponent },
  //{ path: 'menu', component: MenuComponent },
  {path:'menu', component: MenuComponent,
    children:[
      { path: 'registrar', component: RegistrarPersonaComponent },
      { path: 'contenido-criterios', component: ContenidoCriteriosComponent,
        children: [
          { path: 'clasificacion-criterios', component: ClasificacionCriteriosComponent },
          { path: 'clasificacion-actualizar', component: ClasificacionCriteriosActualizarComponent },
          { path: 'clasificacion-listar', component: ClasificacionCriteriosListarComponent},
          { path: 'criterios', component: CriteriosComponent },
          { path: 'criterios-actualizar', component: CriteriosActualizarComponent },
          { path: 'criterios-listar', component: CriteriosListarComponent },
        ]  
      },
      
      //{ path: 'criterios', component: CriteriosComponent },
      //{ path: 'clasificacion', component: ClasificacionCriteriosComponent },
    ]
  },
  { path: 'persona/listar', component: ListarPersonaComponent },
  { path: 'persona/registrar', component: RegistrarPersonaComponent },

  ///AGREGAR RUTAS SOBRE ESTO
  { path: '**', redirectTo: 'login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
