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

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea eliminar la calificación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
     
        this.calificacionService.eliminarcriterios(codCalificacion).subscribe(() => {
       
          this.obtenerCriterios(); 
    
          Swal.fire(
            '¡Eliminado!',
            'La calificación ha sido eliminada.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar el criterio:', error);
       
          Swal.fire(
            'Error',
            'Hubo un error al intentar eliminar la calificación.',
            'error'
          );
        });
      }
    });
  }
  
  
}

 