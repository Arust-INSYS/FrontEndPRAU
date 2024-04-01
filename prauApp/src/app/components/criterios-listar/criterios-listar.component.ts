import { Component } from '@angular/core';
import { Criterios } from '../../models/criterios';
import { CriteriosService } from '../../services/criterios.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-criterios-listar',
  templateUrl: './criterios-listar.component.html',
  styleUrl: './criterios-listar.component.css'
})
export class CriteriosListarComponent {
  
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
  clasificacioncriterio:ClasificacionCriterios = new ClasificacionCriterios();
  criterios:Criterios = new Criterios();
  criterio: Criterios[] = [];
  customers: any
  selectedCustomers:any
  loading:any
  constructor(private criteriosService: CriteriosService, private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerCriterios();
  }

  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterio = dato;
    });
  }

  actualizarCriterio(id: number) {
    this.router.navigate(['/criterios-actualizar', id]); // Redirigir a la ruta de actualización con el ID del criterio
}
  redirectToCriterios() {
    this.router.navigate(['/criterios']);
  }
  eliminarCriterio(id: number) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este criterio?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.criteriosService.eliminarcriterios(id).subscribe(() => {
          this.obtenerCriterios(); 
          Swal.fire(
            '¡Eliminado!',
            'El criterio ha sido eliminado correctamente.',
            'success'
          );
        }, error => {
          console.error('Error al eliminar el criterio:', error);
          Swal.fire(
            'Error',
            'Ha ocurrido un error al eliminar el criterio.',
            'error'
          );
        });
      }
    });
  }
  
  
}

 
