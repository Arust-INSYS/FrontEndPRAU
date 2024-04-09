import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { PeriodoAcService } from '../../services/periodo-ac.service';
import { PeriodoAc } from '../../models/periodoAc';
import { CarreraService } from '../../services/carrera.service';
import { Carrera } from '../../models/carrera';
import { IAsignaturaXCarrera, IConsultarAula, IDocenteXAsignatura } from '../../interface/IConsultasBD';
import { AsignaturaService } from '../../services/asignatura.service';

@Component({
  selector: 'app-evaluacion-criterios-calificar',
  templateUrl: './evaluacion-criterios-calificar.component.html',
  styleUrl: './evaluacion-criterios-calificar.component.css',
})
  
export class EvaluacionCriteriosCalificarComponent implements OnInit {

  criteriosIds: number[] = [];

  calificaciones: Calificacion[] = [];

  criterio: Criterios[] = [];

  calificacionesPorCriterio: { idCriterio: number, calificacion: string }[] = []; // Array para almacenar las calificaciones por criterio
  
  clasificaciones: ClasificacionCriterios[] = [];
  evaluacionDets: EvaluacionDet[] = [];


  usuario: Usuario[] = [];
  // docentes: any[] = [];
  cursos: any[] = [];
  criterios: any[] = [];
  calificacion: any[] = [];

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

  TotalCMCNC: number = 0;




  evaluacionDet: EvaluacionDet = new EvaluacionDet(); // Objeto para almacenar la evaluación detallada
  porcentajeCumplimientoC: number = 0;
  porcentajeCumplimientoM: number = 0;
  porcentajeCumplimientoN: number = 0;

  //////////////////////////BRYAN///////////////////////////////////////////
  //nro evaluacion
  nroEvaluacion: number = 0;

  //LISTA DE FILTROS
  periodosAc: PeriodoAc[] = [];
  carreras: Carrera[] = [];
  asignaturas: IAsignaturaXCarrera[] = [];
  docentes: IDocenteXAsignatura[] = [];
  aulas: IConsultarAula[] = []
  //filtros
  selectedPeriodo: any;
  selectedCarrera: any;
  selectedAsignatura: any;
  selectedDocente: any;
  selectedAula: any;

  //OBJETOS
  evaluacionCab: EvaluacionCab = new EvaluacionCab(); // Objeto para almacenar la evaluación general

  constructor(
    private http: HttpClient,
    private evaluacionDetService: EvaluacionDetService,
    private evaluacionCabService: EvaluacionCabService,
    private criteriosService: CriteriosService,
    private calificacionService: CalificacionService,
    private clasificacionService: ClasificacionCriteriosService,
    private aulaService: AulaService,
    private sharedDataService: SharedDataService,
    private usuarioService: UsuarioService,
    private periodoAcService: PeriodoAcService,
    private carreraService: CarreraService,
    private asignaturaService: AsignaturaService,

  ) { }

  ngOnInit(): void {
    this.obtenerNroEva();
    //cargar filtros;
    this.loadPeriodos();
    this.loadCarreras();
    this.loadAsignaturas();
    this.loadDocentes();
    this.consultarAula();
    ////
    // this.listarCriterios(); // Llamar a la función para obtener los criterios al inicializar el componente
    // this.getCalificaciones();
    // this.listarcalifi();
    // this.getCriterios();
    // this.getClasificaciones();
    // this.obtenerCursos();
    // this.crearEvaluacionesDetVacias();
  }
  obtenerNroEva(): void {
    this.evaluacionCabService.nroEvaluacionNew().subscribe(eva => {
      this.nroEvaluacion = eva;
    })
  }
  loadPeriodos(): void {
    this.periodoAcService.getPeriodosAcs().subscribe(response => {
      this.periodosAc = response;
    })
  }

  loadCarreras(): void {
    this.carreraService.obtenerListaCarreras().subscribe(response => {
      this.carreras = response;
    })
  }

  loadAsignaturas(): void {
    this.asignaturaService.asignaturaXCarreara(this.selectedCarrera?.idCarrera ?? 0).subscribe(response => {
      this.asignaturas = response;
    })
  }

  loadDocentes(): void {
    this.usuarioService.docenteXAsignatura(this.selectedAsignatura?.idAsignatura ?? 0).subscribe(response => {
      this.docentes = response;
    })
  }

  consultarAula(): void {
    this.aulaService.aulaConsultar(
      this.selectedAsignatura?.idAsignatura ?? 0,
      this.selectedCarrera?.idCarrera ?? 0,
      this.selectedPeriodo?.idPeriodoAc ?? 0,
      this.selectedDocente?.usuId ?? 0
    ).subscribe(response => {
      this.aulas = response;
    })
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

      // Almacena los IDs de los criterios
      this.criteriosIds = criterios.map(criterio => criterio.idCriterio);
    });
  }

  async listarCriterios() {
    await this.criteriosService.obtenerListacriterios().subscribe((res: any[]) => {
      this.criterios = res.map((doc) => ({
        label: doc.descripcion,
        value: doc.idCriterio,
      }));
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

  async listarcalifi() {
    await this.calificacionService.obtenerListacriterios().subscribe((res: any[]) => {
      this.calificacion = res.map((doc) => ({
        label: doc.descripcion,
        value: doc.codCalificacion,
      }));
    });
  } 
  onCalificacionSeleccionado(selectedCalificacion: any, cri:number) {
    // Aquí puedes realizar el cálculo o cualquier otra acción necesaria
    console.log('Calificacion seleccionado:', selectedCalificacion, cri);

    if (selectedCalificacion === 'C' || selectedCalificacion === 'CM' || selectedCalificacion === 'NC') {

      const index = this.calificacionesPorCriterio.findIndex(item => item.idCriterio === cri);
      
      if (index !== -1) {
        // Si ya existe, actualizar la calificación
        this.calificacionesPorCriterio[index].calificacion = selectedCalificacion;
      } else {
        // Si no existe, agregarla al array
        this.calificacionesPorCriterio.push({ idCriterio: cri, calificacion: selectedCalificacion });
      }
      
      // Actualizar los contadores y calcular los porcentajes
      this.actualizarContadores();

      this.contarCalificaciones();
    } else {
      // Si la calificación no es válida, no hacer nada
    }
  }

  actualizarContadores(){
    // Reiniciar los contadores
    this.contarC = 0;
    this.contarCM = 0;
    this.contarNC = 0;

    // Calcular los contadores según las calificaciones almacenadas
    this.calificacionesPorCriterio.forEach(item => {
      if (item.calificacion === 'C') {
        this.contarC++;
      } else if (item.calificacion === 'CM') {
        this.contarCM++;
      } else if (item.calificacion === 'NC') {
        this.contarNC++;
      }
    });
  }
  
  contarCalificaciones(){
    const totalCriterios = this.criterios.length;

    // Calcular los porcentajes de cumplimiento para cada tipo de calificación
    this.porcentajeCumplimientoC = (this.contarC / totalCriterios) * 100;
    this.porcentajeCumplimientoM = (this.contarCM / totalCriterios) * 100;
    this.porcentajeCumplimientoN = (this.contarNC / totalCriterios) * 100;
  }

  /*guardarCalificaciones(){
    
    // Guardar las calificaciones individuales de cada criterio en EvaluacionDet
    this.criteriosIds.forEach((idCriterio, index) => {

      const evaluacionDet: EvaluacionDet = {
        secCalificacion: 0, // El ID se generará automáticamente en la base de datos
        evaluacionCab: this.evaluacionCab,
        calificacion: this.calificaciones, // Asignar la calificación correspondiente
        criterio: this.criterio // Asignar el ID del criterio actual
      };
      // Llamar al servicio para crear la EvaluacionDet
    this.evaluacionDetService.CrearEvaluacionDET(evaluacionDet).subscribe(() => {
      // Éxito al guardar la EvaluacionDet
      console.log(`EvaluacionDet para el criterio con ID ${idCriterio} guardada correctamente.`);
    }, error => {
      // Error al guardar la EvaluacionDet
      console.error(`Error al guardar la EvaluacionDet para el criterio con ID ${idCriterio}: `, error);
    });
  });

  }*/

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
