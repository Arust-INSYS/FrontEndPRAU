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
getSeverity(arg0: any): string|undefined {
throw new Error('Method not implemented.');
}
activityValues: number[] = [0, 100];
statuses: any[] = [ // Aquí debes proporcionar la lista de opciones para el dropdown
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    // Agrega más opciones si es necesario
  ];
  representatives: any[] = [ // Aquí debes proporcionar la lista de representantes
    { name: 'Representante 1' },
    { name: 'Representante 2' },
    // Agrega más representantes si es necesario
  ];
  filterGlobal(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    // Lógica para filtrar usando inputValue
  }
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

 
