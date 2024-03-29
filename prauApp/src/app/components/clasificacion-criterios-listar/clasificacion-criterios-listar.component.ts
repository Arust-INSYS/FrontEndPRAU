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
    console.log('ID del criterio a actualizar:', id);
    this.router.navigate(['clasificacion-criterios-actualizar', id]);
  }

  eliminarCriterio(id: number) {
    this.criteriosService.eliminarcriterios(id).subscribe(() => {
      this.obtenerCriterios(); 
    }, error => {
      console.error('Error al eliminar el criterio:', error);
    
    });
  }
  
  datos: any[] = [
    { id_criterio: 1, nombre_criterio: 'Criterio 1', descripcion: 'Descripción del criterio 1', id_clasificacion_criterios: 1 },
    { id_criterio: 2, nombre_criterio: 'Criterio 2', descripcion: 'Descripción del criterio 2', id_clasificacion_criterios: 2 },
    // Agrega más datos según sea necesario
  ];
}

 

