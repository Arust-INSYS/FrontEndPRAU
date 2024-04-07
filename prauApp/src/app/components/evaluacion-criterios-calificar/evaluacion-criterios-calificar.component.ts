import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Criterios } from '../../models/criterios';
import { CriteriosService } from '../../services/criterios.service';
import { Calificacion } from '../../models/calificacion';
import { ClasificacionCriterios } from '../../models/clasificacion-criterios';
import { CalificacionService } from '../../services/calificacion.service';
import { ClasificacionCriteriosService } from '../../services/clasificacion-criterios.service';
import { Aula } from '../../models/aula';
import { AulaService } from '../../services/aula.service';
import { Usuario } from '../../models/usuario';
import { EvaluacionCab } from '../../models/evaluacionCab';
import { EvaluacionDet } from '../../models/evaluacionDet';
import { EvaluacionCabService } from '../../services/evaluacionCab.service';
import { EvaluacionDetService } from '../../services/evaluacionDet.service';
import { SharedDataService } from '../../services/sharedData.service';

@Component({
  selector: 'app-evaluacion-criterios-calificar',
  templateUrl: './evaluacion-criterios-calificar.component.html',
  styleUrl: './evaluacion-criterios-calificar.component.css',
})
export class EvaluacionCriteriosCalificarComponent {
  criterios: Criterios[] = [];
  criteriosCalificados: any[] = []; // Aquí almacena la calificación de cada criterio
  calificaciones: Calificacion[] = [];
  clasificaciones: ClasificacionCriterios[] = [];
  evaluacionDets: EvaluacionDet[] = [];
  cursos: Aula[] = [];
  usuario: Usuario[] = [];
  cursoSeleccionado: Aula | null = null;
  profesorSeleccionado: Usuario | null = null;
  clasificacionSeleccionada: ClasificacionCriterios | null = null;

  nombreCurso: string = ''; // Variable para almacenar el nombre del curso seleccionado
  nombreDocente: string = ''; // Variable para almacenar el nombre del docente asociado al curso seleccionado
  
  calificacionesHechasC: number = 0; // Variable para contar las calificaciones hechas
  calificacionesHechasCM: number = 0; // Variable para contar las calificaciones hechas
  calificacionesHechasNC: number = 0; // Variable para contar las calificaciones hechas

  contarC: number = 0; // Variable para contar las calificaciones hechas
  contarCM: number = 0; // Variable para contar las calificaciones hechas
  contarNC: number = 0; // Variable para contar las calificaciones hechas

  TotalCMCNC: number =0;

  evaluacionCab: EvaluacionCab = new EvaluacionCab(); // Objeto para almacenar la evaluación general

  calificacionAnterior: string = '';
  nuevaCalificacion: string = '';


  evaluacionDet: EvaluacionDet = new EvaluacionDet(); // Objeto para almacenar la evaluación detallada
  porcentajeCumplimientoC: number = 0;
  porcentajeCumplimientoM: number = 0;
  porcentajeCumplimientoN: number = 0;

  constructor(
    private evaluacionDetService: EvaluacionDetService,
    private evaluacionCabService: EvaluacionCabService,
    private criteriosService: CriteriosService,
    private calificacionService: CalificacionService,
    private clasificacionService: ClasificacionCriteriosService,
    private aulaService: AulaService,
    private sharedDataService: SharedDataService

  ) { }

  ngOnInit(){
    this.sharedDataService.idEvaluacionCabecera$.subscribe((id) => {
      if (id !== null) {
        this.evaluacionCab.nroEvaluacion = id;
      }
    });
    this.getCriterios(); // Llamar a la función para obtener los criterios al inicializar el componente
    this.getCalificaciones();
    this.getClasificaciones();
    this.obtenerCursos();
    this.crearEvaluacionesDetVacias();
  }

  obtenerCursos(){
    this.aulaService.getAulas().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  getClasificaciones() {
    this.clasificacionService
      .obtenerListacriterios()
      .subscribe((clasificaciones) => {
        this.clasificaciones = clasificaciones;
      });
  }

  getCriterios() {
    this.criteriosService.obtenerListacriterios().subscribe((criterios) => {
      this.criterios = criterios;
    });
  }

  criteriosPorClasificacion(idClasificacion: number): Criterios[] {
    return this.criterios.filter(criterio => criterio.clasificacion?.idClasificacion === idClasificacion);
  }

  getCalificaciones() {
    this.calificacionService.obtenerListacriterios().subscribe(calificaciones => {
      this.calificaciones = calificaciones;
    });
  }

  cargarInformacionCurso(){
    if (this.cursoSeleccionado) {
      this.nombreCurso = this.cursoSeleccionado.aulaNombre;
      this.nombreDocente = this.cursoSeleccionado.docente ? this.cursoSeleccionado.docente.usuNombreUsuario.toString() : '';
    } else {
      this.nombreCurso = ''; // Reinicia el nombre del curso si no se selecciona ningún curso
      this.nombreDocente = ''; // Reinicia el nombre del docente si no se selecciona ningún curso
    }
  }

  actualizarCalificacion(event: any){
    // Obtener la nueva calificación del evento
    this.nuevaCalificacion= event.target.value;
    
    // Verificar si la calificación es una opción válida (C, CM o NC)
    if (this.nuevaCalificacion === 'C' || this.nuevaCalificacion === 'CM' || this.nuevaCalificacion === 'NC') {
      // Realizar cualquier lógica adicional si es necesario
      this.actualizarContadores(this.nuevaCalificacion);
    // Llamar al método para contar las calificaciones hechas
      this.contarCalificaciones();
    } else {
      // Si la calificación no es válida, no hacer nada
    }
  }
  
  actualizarContadores(nuevaCalificacion: string){
  // Incrementar el contador correspondiente según la nueva calificación
  if (nuevaCalificacion === 'C') {
    this.contarC++;
  } else if (nuevaCalificacion === 'CM') {
    this.contarCM++;
  } else if (nuevaCalificacion === 'NC') {
    this.contarNC++;
  }
  
}
  
  contarCalificaciones(){
    const totalCriterios = this.criterios.length;
  
    // Calcular los porcentajes de cumplimiento para cada tipo de calificación
    this.porcentajeCumplimientoC = (this.contarC / totalCriterios) * 100;
    this.porcentajeCumplimientoM = (this.contarCM / totalCriterios) * 100;
    this.porcentajeCumplimientoN = (this.contarNC / totalCriterios) * 100;

  }

  guardarCalificaciones(): void {
    // Guardar las calificaciones individuales de cada criterio en EvaluacionDet
    this.criteriosCalificados.forEach((criterio, index) => {
      const evaluacionDet: EvaluacionDet = {
        secCalificacion: 0, // El ID se generará automáticamente en la base de datos
        evaluacionCab: this.evaluacionCab,
        calificacion: criterio.calificacionId,
        criterio: criterio.criterioId
      };
      this.evaluacionDetService.update(evaluacionDet.secCalificacion,evaluacionDet).subscribe();
    });

  }

  actualizarEvaluacionCab() {

    // Obtener la suma total de cada tipo de calificación
    const totalC: number = this.evaluacionDets.reduce((total, det) => {
      return total + (det.calificacion.codCalificacion === 'C' ? 1 : 0);
    }, 0);

    const totalCm: number = this.evaluacionDets.reduce((total, det) => {
      return total + (det.calificacion.codCalificacion === 'CM' ? 1 : 0);
    }, 0);

    const totalNc: number = this.evaluacionDets.reduce((total, det) => {
      return total + (det.calificacion.codCalificacion === 'NC' ? 1 : 0);
    }, 0);

    // Calcular los porcentajes totales
    const totalCalificaciones: number = totalC + totalCm + totalNc;
    const porcTotalC: number = (totalC / totalCalificaciones) * 100;
    const porcTotalCm: number = (totalCm / totalCalificaciones) * 100;
    const porcTotalNc: number = (totalNc / totalCalificaciones) * 100;

    // Determinar las observaciones
    let observaciones = '';
    if (this.formularioCompleto()) {
      observaciones = 'El formulario está completo.';
    } else {
      observaciones = 'Por favor, complete el formulario.';
    }

    // Actualizar EvaluacionCab
    this.evaluacionCab.totalC = totalC;
    this.evaluacionCab.totalCm = totalCm;
    this.evaluacionCab.totalNc = totalNc;
    this.evaluacionCab.porcTotalC = porcTotalC;
    this.evaluacionCab.porcTotalCm = porcTotalCm;
    this.evaluacionCab.porcTotalNc = porcTotalNc;
    this.evaluacionCab.observaciones = observaciones;

    this.evaluacionCabService.update(this.evaluacionCab.nroEvaluacion, this.evaluacionCab).subscribe(() => {
      // La EvaluacionCab se ha actualizado correctamente
      console.log('EvaluacionCab actualizada correctamente.');
      console.log(totalC);
      console.log(totalCm);
      console.log(totalNc);
      console.log(porcTotalC);
      console.log(porcTotalCm);
      console.log(porcTotalNc);
      console.log(observaciones);
    });

  }
  formularioCompleto(): boolean {

    // Verificar si se ha seleccionado una calificación para cada criterio
    const calificacionesSinSeleccionar = this.criterios.filter(criterio => !this.calificaciones.some(calificacion => calificacion.codCalificacion === calificacion.codCalificacion));
    if (calificacionesSinSeleccionar.length > 0) {
      return false;
    }

    // Si se pasaron todas las verificaciones anteriores, el formulario está completo
    return true;
  }

  crearEvaluacionesDetVacias(): void {
    // Crea evaluaciones detalladas vacías para cada criterio
    this.criterios.forEach(criterio => {
      const evaluacionDetVacia: EvaluacionDet = {
        secCalificacion: 0, // El ID se generará automáticamente en la base de datos
        evaluacionCab: this.evaluacionCab,
        calificacion: new Calificacion(), // Asigna null inicialmente
        criterio: criterio // Asigna el criterio correspondiente
      };
      this.evaluacionDets.push(evaluacionDetVacia);
    });
  }

}
