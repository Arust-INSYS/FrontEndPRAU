import { Component } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../models/persona';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  value: any;
  persona: Persona = {
    perApellido: '',
    perCedula: '',
    perDireccion: '',
    perId: 0,
    perNombre1: '',
    perTelefono: '',
  };
  constructor(private personaService: PersonaService) {} // Inyecta tu servicio en el constructor del componente

  registrarPersona(): void {
    this.personaService.registrarPersona(this.persona).subscribe(
      (response) => {
        console.log('Persona registrada correctamente:', response);
        // Aquí puedes manejar la respuesta como desees, por ejemplo, mostrar un mensaje de éxito o redirigir a otra página
      },
      (error) => {
        console.error('Error al registrar persona:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    );
  }
}
