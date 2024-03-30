import { Component } from '@angular/core';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-clasificacion-criterios-listar',
  templateUrl: './clasificacion-criterios-listar.component.html',
  styleUrl: './clasificacion-criterios-listar.component.css'
})
export class ClasificacionCriteriosListarComponent {
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

  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterio = dato;
    });
  }
 

  actualizarCriterio(id: number) {

    this.router.navigate(['/clasificacion-criterios-actualizar',id]);
}
  redirectToCriterios() {
    this.router.navigate(['/clasificacion-criterios']);
  }
  eliminarCriterio(id: number) {
    this.criteriosService.eliminarcriterios(id).subscribe(() => {
      this.obtenerCriterios(); 
    }, error => {
      console.error('Error al eliminar el criterio:', error);
    
    });
  }
  
  
}

 