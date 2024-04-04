import { Component, ViewChild } from '@angular/core';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
@Component({
  selector: 'app-carrera-listar',
  templateUrl: './carrera-listar.component.html',
  styleUrl: './carrera-listar.component.css'
})
export class CarreraListarComponent {

  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  carrera: Carrera[] = [];
  items: MenuItem[]|undefined;
$even: any;
$odd: any;
Delete: string|undefined;
products: any;
dt: any;
selectedProducts: any;
showModal() {
throw new Error('Method not implemented.');
}

  displayModal: boolean = false;

  customers: any
  selectedCustomers:any
  loading:any
  constructor(private carreraService: CarreraService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCarrera();
  }
  applyGlobalFilter() {
    this.table.filter(this.searchTerm, 'nombreCarrera', 'contains'); // Aplicar el filtro global
  }
  obtenerCarrera() {
    this.carreraService.obtenerListaCarreras().subscribe(dato => {
      this.carrera = dato;
    });
  }
 

  actualizarCarrera(id: number) {

    this.router.navigate(['/menu/contenido-carrera/carrera-actualizar',id]);
}
  redirectToCarrera() {
    this.router.navigate(['/menu/contenido-virtual/carrera']);
  }
  eliminarCarrera(id: number) {
    // Mostrar cuadro de diálogo SweetAlert para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea eliminar la carrera?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la eliminación, procede con la eliminación
        this.carreraService.eliminarcarrera(id).subscribe(() => {
          // Actualiza la lista de criterios después de la eliminación
          this.obtenerCarrera(); 
          // Muestra un cuadro de diálogo SweetAlert para informar al usuario que se eliminó correctamente
          Swal.fire(
            '¡Eliminado!',
            'La carrera ha sido eliminada.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar el carrera:', error);
          // Muestra un cuadro de diálogo SweetAlert para informar al usuario sobre el error
          Swal.fire(
            'Error',
            'Hubo un error al intentar eliminar la carrera.',
            'error'
          );
        });
      }
    });
  }
  
}
