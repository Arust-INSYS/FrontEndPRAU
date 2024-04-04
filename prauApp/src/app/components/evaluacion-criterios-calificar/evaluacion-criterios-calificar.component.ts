import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Criterios } from '../../models/criterios';
import { EvaluacionDetService } from '../../services/evaluacionDet.service';
import { CriteriosService } from '../../services/criterios.service';
import { EvaluacionDet } from '../../models/evaluacionDet';
import { Calificacion } from '../../models/calificacion';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { CalificacionService } from '../../services/calificacion.service';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';

@Component({
  selector: 'app-evaluacion-criterios-calificar',
  templateUrl: './evaluacion-criterios-calificar.component.html',
  styleUrl: './evaluacion-criterios-calificar.component.css',
})
export class EvaluacionCriteriosCalificarComponent {
  criterios: Criterios[] = [];
  calificaciones: Calificacion[] = [];
  clasificaciones: ClasificacionCriterios[] = [];
  clasificacionSeleccionada: ClasificacionCriterios | null = null;
  evaluacionDet: EvaluacionDet = new EvaluacionDet(); // Objeto para almacenar la evaluación detallada

  constructor(
    private evaluacionDetService: EvaluacionDetService,
    private criteriosService: CriteriosService,
    private calificacionService: CalificacionService,
    private clasificacionService: ClasificacionCriteriosService
  ) {}

  ngOnInit(): void {
    this.getCriterios(); // Llamar a la función para obtener los criterios al inicializar el componente
    //this.getCalificaciones();
    //this.filtrarCriteriosPorClasificacion();
  }

  getClasificaciones(): void {
    this.clasificacionService
      .obtenerListacriterios()
      .subscribe((clasificaciones) => {
        this.clasificaciones = clasificaciones;
      });
  }

  getCriterios(): void {
    this.criteriosService.obtenerListacriterios().subscribe((criterios) => {
      this.criterios = criterios;
    });
  }

  /*filtrarCriteriosPorClasificacion(): Criterios[] {
    if (!this.clasificacionSeleccionada) return [];
    const criteriosFiltrados = this.criterios.filter(criterio => criterio.clasificacion?.idClasificacion === this.clasificacionSeleccionada.idClasificacion);
    return criteriosFiltrados;
  }*/
  /*
  getCalificaciones(): void {
    this.calificacionService.listarCalificaciones().subscribe(calificaciones => {
      this.calificaciones = calificaciones;
    });
  }*/
}
