import { Component } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
import { Persona } from '../../../models/persona';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrl: './listar-persona.component.scss',
})
export class ListarPersonaComponent {
  value: any;
  personasList: Persona[] = [];
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
  constructor(private personaService: PersonaService) {
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
  listarPersona() {
    this.personaService.getPersonas().subscribe((res) => {
      this.personasList = res;
      console.log(this.personasList);
    });
  }
  eliminarPersona(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.delete(id).subscribe(() => {
          Swal.fire('¡Eliminado!', 'La persona ha sido eliminada.', 'success');
          // Actualiza la lista de personas después de eliminar
          this.actualizarListaPersonas();
        });
      }
    });
  }
  actualizarListaPersonas() {
    window.location.reload();
  }
  //EDITAR
  personaEditar: Persona = new Persona();
  displayModalEdit: boolean = false;

  showModalEditar(persona: Persona) {
    // Abre el modal
    this.displayModalEdit = true;
    // Carga los datos de la persona en el formulario
    this.personaEditar = persona;
  }
  guardarCambios() {
    // Guarda los cambios en la base de datos
    this.personaService.update(72, this.personaEditar).subscribe((res) => {
      // Cierra el modal después de guardar los cambios
      this.displayModalEdit = false;
      console.log('UPDATE: ' + res);
    });
  }
}
