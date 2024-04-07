import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EvaluacionCab } from '../../models/evaluacionCab';
import { EvaluacionCabService } from '../../services/evaluacionCab.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/sharedData.service';

@Component({
  selector: 'app-evaluacion-criterios',
  templateUrl: './evaluacion-criterios.component.html',
  styleUrl: './evaluacion-criterios.component.css'
})
export class EvaluacionCriteriosComponent {
  @ViewChild('dt', { static: true }) table!: Table; 
  searchTerm: string = '';
  items: MenuItem[]|undefined;
$even: any;
$odd: any;
Delete: string|undefined;

dt: any;

showModal() {
throw new Error('Method not implemented.');
}

  displayModal: boolean = false;
  evaluacionCa:EvaluacionCab = new EvaluacionCab();
  evaluacionCab: EvaluacionCab[] = [];
  customers: any
  selectedCustomers:any
  loading:any
  
  constructor(private evaluacionCABService: EvaluacionCabService, 
    private router: Router,
    private toastr: ToastrService, 
    private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.getEvaluacionesCAB();
  }

  getEvaluacionesCAB(): void {
    this.evaluacionCABService.getEvaluacionCAB().subscribe(dato => {
      this.evaluacionCab = dato;
      //this.generarPDF();
    },
    error => {
      console.error('Error al obtener los criterios: ', error);
    }
    );
  } 
  /*getEvaluacionesCAB(): void {
    this.evaluacionCABService.getEvaluacionCAB().subscribe(
      evaluacionCab => this.evaluacionCab = evaluacionCab
    );
    
  }*/
  filtrar() {
  }

  
  crearNuevoDato(): void {
    // Crear un nuevo objeto EvaluacionCab con todos los datos inicializados en 0
    const nuevaEvaluacionCab: EvaluacionCab = {
      nroEvaluacion:0,
      totalC: 0,
      totalCm: 0,
      totalNc: 0,
      porcTotalC: 0,
      porcTotalCm: 0,
      porcTotalNc: 0,
      observaciones: '', // Aquí podrías agregar las observaciones predeterminadas
      aula: undefined, // Ajusta esto según tu implementación
      usuario: undefined, // Ajusta esto según tu implementación
    };

    // Llamar al servicio para guardar el nuevo objeto EvaluacionCab
    this.evaluacionCABService.CrearEvaluacionCab(nuevaEvaluacionCab).subscribe(
      (evaluacionCab: EvaluacionCab) => {
        const nroEvaluacion: number = evaluacionCab.nroEvaluacion;
        this.sharedDataService.actualizarIdEvaluacionCabecera(nroEvaluacion);
        // Después de guardar exitosamente, navegar a la página de criterios-evaluacion-calificacion
        this.router.navigate(['/menu/contenido-criterios/criterios-evaluacion-calificacion']);
      },
      error => {
        // Manejar errores si es necesario
        console.error('Error al guardar la evaluación:', error);
      }
    );
  }

  
  actualizarCriterio(id: number) {
    

  }

  // Método para eliminar un criterio
  eliminarCriterio(id: number) {
    

  }
}