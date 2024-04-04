import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Calificacion } from '../../models/calificacion';
import { MenuItem } from 'primeng/api';
import { CalificacionService } from '../../services/calificacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificacion-listar',
  templateUrl: './calificacion-listar.component.html',
  styleUrl: './calificacion-listar.component.css'
})
export class CalificacionListarComponent {
  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  calificacion: Calificacion[] = [];
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
  constructor(private calificacionService: CalificacionService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCriterios();
  }
  applyGlobalFilter() {
    this.table.filter(this.searchTerm, 'descripcion', 'contains'); // Aplicar el filtro global
  }
  obtenerCriterios() {
    this.calificacionService.obtenerListacriterios().subscribe(dato => {
      this.calificacion = dato;
    });
  }
 

  actualizarCriterio(id: number) {

    this.router.navigate(['/menu/contenido-criterios/calificacion-actualizar',id]);
}
  redirectToCriterios() {
    this.router.navigate(['/menu/contenido-criterios/calificacion']);
  }


 
  eliminarCriterio(codCalificacion: string) {
    // Convertir codCalificacion de string a number
 
  
    // Mostrar cuadro de diálogo SweetAlert para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea eliminar la clasificación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la eliminación, procede con la eliminación
        this.calificacionService.eliminarcriterios(codCalificacion).subscribe(() => {
          // Actualiza la lista de criterios después de la eliminación
          this.obtenerCriterios(); 
          // Muestra un cuadro de diálogo SweetAlert para informar al usuario que se eliminó correctamente
          Swal.fire(
            '¡Eliminado!',
            'La clasificación ha sido eliminada.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar el criterio:', error);
          // Muestra un cuadro de diálogo SweetAlert para informar al usuario sobre el error
          Swal.fire(
            'Error',
            'Hubo un error al intentar eliminar la clasificación.',
            'error'
          );
        });
      }
    });
  }
  
  
}

 