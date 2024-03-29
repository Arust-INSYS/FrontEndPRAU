import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordModule } from 'primeng/password';

import { FloatLabelModule } from 'primeng/floatlabel';
import { LoginComponent } from './components/Login/Login.component';
import { ToastrModule } from 'ngx-toastr';


import { GestionarPersonaComponent } from './components/gestionar-persona/gestionar-persona.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Importación del módulo HttpClientModule
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [AppComponent,
    LoginComponent, GestionarPersonaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    InputTextModule,
    SidebarModule,
    BrowserAnimationsModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
