import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EvaluacionCab } from '../../models/evaluacionCab';
import { EvaluacionCabService } from '../../services/evaluacionCab.service';

@Component({
  selector: 'app-evaluacion-criterios',
  templateUrl: './evaluacion-criterios.component.html',
  styleUrl: './evaluacion-criterios.component.css'
})
export class EvaluacionCriteriosComponent {
 

  evaluacionCa:EvaluacionCab = new EvaluacionCab();
  evaluacionCab: EvaluacionCab[] = [];
  
 
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
  constructor(private evaluacionCABService: EvaluacionCabService) { }

  ngOnInit(): void {
    this.getEvaluacionesCAB();
  }

  getEvaluacionesCAB(): void {
    this.evaluacionCABService.getEvaluacionCAB().subscribe(
      evaluacionCab => this.evaluacionCab = evaluacionCab
    );
  }
  filtrar() {
  }

  
  crearNuevoDato() {
    
  }

  
  actualizarCriterio(id: number) {
    

  }

  // Método para eliminar un criterio
  eliminarCriterio(id: number) {
    

  }
}