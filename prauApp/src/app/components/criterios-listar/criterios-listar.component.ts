import { Component } from '@angular/core';
import { Criterios } from '../../models/criterios';
import { CriteriosService } from '../../services/criterios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criterios-listar',
  templateUrl: './criterios-listar.component.html',
  styleUrl: './criterios-listar.component.css'
})
export class CriteriosListarComponent {
  criterio: Criterios[] = [];

  constructor(private criteriosService: CriteriosService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCriterios();
  }

  obtenerCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe(dato => {
      this.criterio = dato;
    });
  }

  actualizarCriterio(id: number) {
    this.router.navigate(['criterios-actualizar', id]);
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

 
