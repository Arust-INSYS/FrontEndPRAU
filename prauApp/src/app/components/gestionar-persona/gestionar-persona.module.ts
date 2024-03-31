import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPersonaComponent } from './listar-persona/listar-persona.component';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
@NgModule({
  declarations: [ListarPersonaComponent, RegistrarPersonaComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    InputGroupModule,
  ],
})
export class GestionarPersonaModule {}
