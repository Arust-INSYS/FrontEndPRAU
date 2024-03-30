import { Component } from '@angular/core';
import { Criterios } from '../../models/criterios';
import { CriteriosService } from '../../services/criterios.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-criterios-listar',
  templateUrl: './criterios-listar.component.html',
  styleUrl: './criterios-listar.component.css'
})
export class CriteriosListarComponent {
  criterios = [
    { idCriterio: 1, nombreCriterio: 'Criterio 1', descripcion: 'Descripción del criterio 1' },
    { idCriterio: 2, nombreCriterio: 'Criterio 2', descripcion: 'Descripción del criterio 2' },
    { idCriterio: 3, nombreCriterio: 'Criterio 3', descripcion: 'Descripción del criterio 3' }
    // Puedes agregar más datos aquí si es necesario
  ];
items: MenuItem[]|undefined;
$even: any;
$odd: any;
showModal() {
throw new Error('Method not implemented.');
}
  displayModal: boolean = false;

  criterio: Criterios[] = [];
  customers: any
  selectedCustomers:any
  loading:any
  constructor(private criteriosService: CriteriosService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCriterios();
  }

  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterio = dato;
    });
  }

  /*actualizarCriterio(id: number) {
    this.router.navigate(['criterios-actualizar', id]);
  }*/
  actualizarCriterio(idCriterio: string) {
    // Realiza las operaciones necesarias con el criterio
    // ...

    // Luego redirige a la ruta "clasificacion-criterios-actualizar"
    this.router.navigate(['/clasificacion-criterios-actualizar']);
}
  redirectToCriterios() {
    this.router.navigate(['/criterios']);
  }
  eliminarCriterio(id: number) {
    this.criteriosService.eliminarcriterios(id).subscribe(() => {
      this.obtenerCriterios(); 
    }, error => {
      console.error('Error al eliminar el criterio:', error);
    
    });
  }
  
  
}

 
