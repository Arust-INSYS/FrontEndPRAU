import { Component } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrl: './listar-persona.component.css',
})
export class ListarPersonaComponent {
  value: any;
  personas: any;
  displayModal: boolean = false;

  items = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    },
  ];
  constructor(private personaService: PersonaService, private router: Router) {
    this.listarPersona();
  }

  showModal() {
    this.displayModal = true;
    //this.router.navigate(['/persona', 'registrar']); // Navega a la ruta de MiModalComponent
  } /*
  async listarPersona() {
    await this.personaService.getAllPersonas().subscribe((res) => {
      console.log((this.personas = res));
    });
  }*/
  async listarPersona() {
    await this.personaService.getPersonas().subscribe((res) => {
      console.log((this.personas = res));
    });
  }
}
