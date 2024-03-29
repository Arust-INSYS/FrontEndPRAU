import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionarPersonaComponent } from './components/gestionar-persona/gestionar-persona.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // Importación del módulo HttpClientModule
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [AppComponent, GestionarPersonaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
