import { Component, ViewChild } from '@angular/core';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-clasificacion-criterios-listar',
  templateUrl: './clasificacion-criterios-listar.component.html',
  styleUrl: './clasificacion-criterios-listar.component.css'
})
export class ClasificacionCriteriosListarComponent {
  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  criterio: ClasificacionCriterios[] = [];
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
  constructor(private criteriosService: ClasificacionCriteriosService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCriterios();
  }
  applyGlobalFilter() {
    this.table.filter(this.searchTerm, 'nombreClasificacion', 'contains'); // Aplicar el filtro global
  }
  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterio = dato;
    });
  }
 

  actualizarCriterio(id: number) {

    this.router.navigate(['/clasificacion-criterios-actualizar',id]);
}
  redirectToCriterios() {
    this.router.navigate(['/menu/contenido-criterios/clasificacion-criterios']);
  }
  eliminarCriterio(id: number) {
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
        this.criteriosService.eliminarcriterios(id).subscribe(() => {
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

 