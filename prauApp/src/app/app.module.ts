import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CriteriosActualizarComponent } from './components/criterios-actualizar/criterios-actualizar.component';

import { CriteriosListarComponent } from './components/criterios-listar/criterios-listar.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ClasificacionCriteriosComponent } from './components/clasificacion-criterios/clasificacion-criterios.component';
import { ClasificacionCriteriosActualizarComponent } from './components/clasificacion-criterios-actualizar/clasificacion-criterios-actualizar.component';
import { ClasificacionCriteriosListarComponent } from './components/clasificacion-criterios-listar/clasificacion-criterios-listar.component';
const routes:Routes = [
  
  { path: 'criterios', component: CriteriosComponent},
  { path: 'criterios-listar', component: CriteriosListarComponent},
  { path: 'criterios-actualizar', component: CriteriosActualizarComponent},
  { path: 'clasificacion-criterios', component: ClasificacionCriteriosComponent},
  { path: 'clasificacion-criterios-actualizar', component:  ClasificacionCriteriosActualizarComponent},
  { path: 'clasificacion-criterios-actualizar/:id', component: ClasificacionCriteriosActualizarComponent },
  { path: 'criterios-actualizar/:id', component: CriteriosActualizarComponent },
  { path: 'clasificacion-criterios-listar', component: ClasificacionCriteriosListarComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    CriteriosComponent,
    CriteriosActualizarComponent,
    
    CriteriosListarComponent,
          ClasificacionCriteriosComponent,
          ClasificacionCriteriosActualizarComponent,
          ClasificacionCriteriosListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    InputTextModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
