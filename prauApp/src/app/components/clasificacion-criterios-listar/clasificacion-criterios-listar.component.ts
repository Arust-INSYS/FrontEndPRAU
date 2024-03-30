import { Component } from '@angular/core';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clasificacion-criterios-listar',
  templateUrl: './clasificacion-criterios-listar.component.html',
  styleUrl: './clasificacion-criterios-listar.component.css'
})
export class ClasificacionCriteriosListarComponent {
  criterio: ClasificacionCriterios[] = [];
  criterios = [
    { idClasificacion: 1, nombreClasificacion: 'Criterio 1', descripcion: 'Descripción del criterio 1' },
    { idClasificacion: 2, nombreClasificacion: 'Criterio 2', descripcion: 'Descripción del criterio 2' },
    { idClasificacion: 3, nombreClasificacion: 'Criterio 3', descripcion: 'Descripción del criterio 3' }
    // Puedes agregar más datos aquí si es necesario
  ];
  constructor(private criteriosService: ClasificacionCriteriosService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCriterios();
  }

  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterio = dato;
    });
  }

  /*actualizarCriterio(id: number) {
    console.log('ID del criterio a actualizar:', id);
    this.router.navigate(['clasificacion-criterios-actualizar', id]);
  }*/
  actualizarCriterio(idCriterio: string) {
    // Realiza las operaciones necesarias con el criterio
    // ...

    // Luego redirige a la ruta "clasificacion-criterios-actualizar"
    this.router.navigate(['/clasificacion-criterios-actualizar']);
}
  eliminarCriterio(id: number) {
    this.criteriosService.eliminarcriterios(id).subscribe(() => {
      this.obtenerCriterios(); 
    }, error => {
      console.error('Error al eliminar el criterio:', error);
    
    });
  }
  redirectToCriterios() {
    this.router.navigate(['/clasificacion-criterios']);
  }
  
}

 

