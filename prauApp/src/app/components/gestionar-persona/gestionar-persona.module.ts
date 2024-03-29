import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPersonaComponent } from './listar-persona/listar-persona.component';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ListarPersonaComponent, RegistrarPersonaComponent],
  imports: [CommonModule, FormsModule, TableModule],
})
export class GestionarPersonaModule {}
