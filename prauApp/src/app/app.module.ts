import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CriteriosActualizarComponent } from './components/criterios-actualizar/criterios-actualizar.component';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LoginComponent } from './components/Login/Login.component';
import { ToastrModule } from 'ngx-toastr';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CriteriosListarComponent } from './components/criterios-listar/criterios-listar.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
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
          ClasificacionCriteriosListarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    InputTextModule,
    BrowserAnimationsModule,
    FormsModule,
    MultiSelectModule,
    SliderModule,
    TableModule,
    ProgressBarModule,
    TagModule,
    DropdownModule,
    PasswordModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
