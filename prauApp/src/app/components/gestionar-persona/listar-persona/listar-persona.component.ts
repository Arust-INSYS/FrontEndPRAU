import { Component } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrl: './listar-persona.component.css',
})
export class ListarPersonaComponent {
  value: any;
  personas: any;
  constructor(private personaService: PersonaService) {
    this.listarPersona();
  }
  async listarPersona() {
    await this.personaService.getAllPersonas().subscribe((res) => {
      console.log((this.personas = res));
    });
  }
}
