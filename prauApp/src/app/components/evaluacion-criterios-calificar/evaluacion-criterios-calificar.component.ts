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
import { Aula } from '../../models/aula';
import { AulaService } from '../../services/aula.service';
import { Usuario } from '../../models/usuario';
import { EvaluacionCab } from '../../models/evaluacionCab';
import { EvaluacionCabService } from '../../services/evaluacionCab.service';

@Component({
  selector: 'app-evaluacion-criterios-calificar',
  templateUrl: './evaluacion-criterios-calificar.component.html',
  styleUrl: './evaluacion-criterios-calificar.component.css',
})
export class EvaluacionCriteriosCalificarComponent {
  criterios: Criterios[] = [];
  calificaciones: Calificacion[] = [];
  clasificaciones: ClasificacionCriterios[] = [];
  cursos: Aula[] = [];
  usuario: Usuario[] = [];
  cursoSeleccionado: Aula | null = null;
  clasificacionSeleccionada: ClasificacionCriterios | null = null;
  nombreCurso: string = ''; // Variable para almacenar el nombre del curso seleccionado
  nombreDocente: string = ''; // Variable para almacenar el nombre del docente asociado al curso seleccionado
  calificacionesHechas: number = 0; // Variable para contar las calificaciones hechas
  totalCriterios: number = 0; // Variable para almacenar el número total de criterios
  evaluacionCab: EvaluacionCab = new EvaluacionCab(); // Objeto para almacenar la evaluación general

  porcentajeCumplimientoC: number = 0; // Porcentaje de cumplimiento de calificaciones C
  porcentajeCumplimientoCM: number = 0; // Porcentaje de cumplimiento de calificaciones CM
  porcentajeCumplimientoNC: number = 0; // Porcentaje de cumplimiento de calificaciones NC



  evaluacionDet: EvaluacionDet = new EvaluacionDet(); // Objeto para almacenar la evaluación detallada
  porcentajeCumplimiento: number = 0;

  constructor(
    private evaluacionDetService: EvaluacionDetService,
    private criteriosService: CriteriosService,
    private calificacionService: CalificacionService,
    private clasificacionService: ClasificacionCriteriosService,
    private aulaService: AulaService,
    private evaluacionCabService: EvaluacionCabService
  ) {}

  ngOnInit(): void {
    this.getCriterios(); // Llamar a la función para obtener los criterios al inicializar el componente
    this.getCalificaciones();
    this.getClasificaciones();
    this.obtenerCursos(); 
    
  }

  obtenerCursos(): void {
    this.aulaService.getAulas().subscribe(cursos => {
      this.cursos = cursos;
    });
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

  criteriosPorClasificacion(idClasificacion: number): Criterios[] {
    return this.criterios.filter(criterio => criterio.clasificacion?.idClasificacion === idClasificacion);
}
  
  getCalificaciones(): void {
    this.calificacionService.obtenerListacriterios().subscribe(calificaciones => {
      this.calificaciones = calificaciones;
    });
  }

  cargarInformacionCurso(): void {
    if (this.cursoSeleccionado) {
        this.nombreCurso = this.cursoSeleccionado.aulaNombre;
        this.nombreDocente = this.cursoSeleccionado.docente ? this.cursoSeleccionado.docente.usuNombreUsuario.toString() : '';
    } else {
        this.nombreCurso = ''; // Reinicia el nombre del curso si no se selecciona ningún curso
        this.nombreDocente = ''; // Reinicia el nombre del docente si no se selecciona ningún curso
    }
}

  actualizarCalificacion(event: any): void {
    // Obtener la nueva calificación del evento
    const nuevaCalificacion = event.target.value; 
    
    // Verificar si la calificación es una opción válida (C, CM o NC)
    if (nuevaCalificacion === 'C' || nuevaCalificacion === 'CM' || nuevaCalificacion === 'NC') {
        // Realizar cualquier lógica adicional si es necesario
        
        // Llamar al método para contar las calificaciones hechas
        this.contarCalificaciones();
    } else {
        // Si la calificación no es válida, no hacer nada
    }
  }

  contarCalificaciones(): void {
    this.calificacionesHechas++;
    this.porcentajeCumplimiento = (this.calificacionesHechas / this.criterios.length) * 100;
  }

  

}
