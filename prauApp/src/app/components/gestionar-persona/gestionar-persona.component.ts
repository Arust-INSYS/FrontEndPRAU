import { Component } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
@Component({
  selector: 'app-gestionar-persona',
  templateUrl: './gestionar-persona.component.html',
  styleUrl: './gestionar-persona.component.css',
})
export class GestionarPersonaComponent {
  value: any;
  sidebarVisible = false;
  personas: any;
  constructor(private personaService: PersonaService) {
    this.listarPersona();
  }

  ngOnInit(): void {}
  async listarPersona() {
    await this.personaService.getAllPersonas().subscribe((res) => {
      console.log((this.personas = res));
    });
  }
}
