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
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluacion-criterios-calificar',
  templateUrl: './evaluacion-criterios-calificar.component.html',
  styleUrl: './evaluacion-criterios-calificar.component.css',
})

export class EvaluacionCriteriosCalificarComponent implements OnInit {

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
  progreso: number = 0; // Variable para contar las calificaciones hechas

  TotalCMCNC: number = 0;
  porcentajeCumplimientoC: number = 0;
  porcentajeCumplimientoM: number = 0;
  porcentajeCumplimientoN: number = 0;


  //////////////////////////BRYAN///////////////////////////////////////////
  //nro evaluacion
  nroEvaluacion: number = 0;
  id!: number;
  status!: string;

  //LISTA DE FILTROS
  periodosAc: PeriodoAc[] = [];
  carreras: Carrera[] = [];
  asignaturas: IAsignaturaXCarrera[] = [];
  docentes: IDocenteXAsignatura[] = [];
  usuario: Usuario[] = [];
  aulas: IConsultarAula[] = [];
  clasificaciones: ClasificacionCriterios[] = [];
  //
  evaluacionDets: EvaluacionDet[] = [];
  evaluacionDeta: EvaluacionDet[] = [];
  //
  criteriosIds: number[] = [];
  calificaciones: Calificacion[] = [];
  criterio: Criterios[] = [];
  //calificacionesPorCriterio: { idCriterio: number, calificacion: string }[] = []; // Array para almacenar las calificaciones por criterio

  //filtros
  selectedPeriodo: any;
  selectedCarrera: any;
  selectedAsignatura: any;
  selectedDocente: any;
  selectedAula: any;
  // docentes: any[] = [];
  cursos: any[] = [];
  criterios: any[] = [];

  listCriterios: Criterios[] = [];
  calificacion: Calificacion[] = [];

  userId: number | null = null;

  //OBJETOS
  evaluacionCab: EvaluacionCab = new EvaluacionCab(); // Objeto para almacenar la evaluación detallada
  evaluacionDet: EvaluacionDet = new EvaluacionDet(); // Objeto para almacenar la evaluación detallada

  constructor(
    private http: HttpClient,
    private evaluacionDetService: EvaluacionDetService,
    private localStorage: LocalStorageService,
    private evaluacionCabService: EvaluacionCabService,
    private criteriosService: CriteriosService,
    private calificacionService: CalificacionService,
    private clasificacionService: ClasificacionCriteriosService,
    private aulaService: AulaService,
    private sharedDataService: SharedDataService,
    private sessionStorage: LocalStorageService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private periodoAcService: PeriodoAcService,
    private carreraService: CarreraService,
    private asignaturaService: AsignaturaService,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.status = params['status'];
      console.log(this.id, this.status);
    });
    //cargar filtros;
    this.loadPeriodos();
    this.loadCarreras();
    this.loadAsignaturas();
    this.loadDocentes();
    this.consultarAula();
    ////
    this.getCalificaciones();
    this.listarcalifi();
    this.getCriterios();
    this.getClasificaciones();
    this.userId = this.sessionStorage.getItem('userId');

    if (this.status == 'edit'){
      if (this.id) {
        this.cargarEvaluacion(this.id);
        this.cargarDetalle(this.id);
        this.contarCalificaciones();
      }
    }else{
      this.obtenerNroEva();
      this.listarCriterios(); // Llamar a la función para obtener los criterios al inicializar el componente

    }


    // this.obtenerCursos();
    // this.crearEvaluacionesDetVacias();
  }
  cargarEvaluacion(id: number) {
    this.evaluacionCabService.findNroEvaluacion(id).subscribe(
      response => {
        this.evaluacionCab = response;
        this.nroEvaluacion = this.evaluacionCab.nroEvaluacion;
        this.contarC = this.evaluacionCab.totalC;
        this.contarCM = this.evaluacionCab.totalCm;
        this.contarNC = this.evaluacionCab.totalNc;
        this.progreso = this.evaluacionCab.progreso;


      },
      error => {
        console.error('Error al cargar la calificacion:', error);
      }
    );
  }

  cargarDetalle(id: number) {
    this.evaluacionDetService.detalleEvaluacion(id).subscribe(
      response => {
        this.evaluacionDets = response;
        const correctCriterions = this.evaluacionDets.filter(det => det.criterio?.idCriterio !== null); // Assuming criterioId is the property for the criterion ID.
        this.evaluacionDeta = correctCriterions;
      },
      error => {
        console.error('Error al cargar el detalle:', error);
      }
    );
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
    this.evaluacionCab.aulaEva!.aulaId = this.selectedCarrera;
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

  // listarPersona() {
  //   this.usuarioService.getAllUsuarios().subscribe((res) => {
  //     this.userList = res;
  //     this.loadExcelReportData(this.userList);
  //   });
  // }


  async listarCriterios() {
    if (this.status !== 'edit') {
      await this.criteriosService.obtenerListacriterios().subscribe((res) => {
        this.generarDetalle(res);
      });
    } else {
      console.log('ya hay criterios');
    }
  }

  generarDetalle(listCriterios: Criterios[]) {
    for (let criterio of listCriterios) {
      let det = new EvaluacionDet();
      det.criterio = criterio;
      this.evaluacionDets.push(det);

    }
  }

  // criteriosPorClasificacion(idClasificacion: number): Criterios[] {
  //   return this.criterios.filter(criterio => criterio.clasificacion?.idClasificacion === idClasificacion);
  // }

  criteriosPorClasificacion(idClasificacion: number): EvaluacionDet[] {
    return this.evaluacionDets.filter(det => det?.criterio?.clasificacion?.idClasificacion === idClasificacion);

  }

  getCalificaciones() {
    this.calificacionService.obtenerListacriterios().subscribe(calificaciones => {
      this.calificaciones = calificaciones;
    });
  }

  async listarcalifi() {
    await this.calificacionService.obtenerListacriterios().subscribe((res: any[]) => {
      this.calificacion = res
    });
  }
  onCalificacionSeleccionado() {
    // Aquí puedes realizar el cálculo o cualquier otra acción necesaria

    // console.log('Calificacion seleccionado:', selectedCalificacion, cri);
    this.actualizarContadores();

    this.contarCalificaciones();

    // if (selectedCalificacion === 'C' || selectedCalificacion === 'CM' || selectedCalificacion === 'NC') {

    //const index = this.calificacionesPorCriterio.findIndex(item => item.idCriterio === cri);

    //if (index !== -1) {
    // Si ya existe, actualizar la calificación
    //this.calificacionesPorCriterio[index].calificacion = selectedCalificacion;
    //} else {
    // Si no existe, agregarla al array
    // this.calificacionesPorCriterio.push({ idCriterio: cri, calificacion: selectedCalificacion });
    // }

    // Actualizar los contadores y calcular los porcentajes

    // } else {
    //   // Si la calificación no es válida, no hacer nada
    //   console.log('Calificacion no valida');
    // }

  }

  actualizarContadores() {
    // Reiniciar los contadores
    this.contarC = 0;
    this.contarCM = 0;
    this.contarNC = 0;
    this.progreso = 0;

    // Calcular los contadores según las calificaciones almacenadas
    //this.calificacionesPorCriterio.forEach(item => {
    this.evaluacionDets.forEach(item => {
      if (item.calificacion.codCalificacion === 'C') {
        this.contarC++;
      } else if (item.calificacion.codCalificacion === 'CM') {
        this.contarCM++;
      } else if (item.calificacion.codCalificacion === 'NC') {
        this.contarNC++;
      }
    });
  }

  contarCalificaciones() {

    const totalCriterios = this.evaluacionDets.length;

    this.evaluacionCab.progreso = ((this.contarC||0 + this.contarCM||0  + this.contarNC||0 ) / totalCriterios) * 100;

    // Calcular los porcentajes de cumplimiento para cada tipo de calificación
    alert((this.contarC||0 * 100) );
    this.evaluacionCab.porcTotalC = (this.contarC* 100) / totalCriterios;
    this.evaluacionCab.porcTotalCm = (this.contarCM||0  / totalCriterios) * 100;
    this.evaluacionCab.porcTotalNc = (this.contarNC||0  / totalCriterios) * 100;
  }

  crearNuevaEvaluacionCab() {

    //asignar aula
    this.evaluacionCab.aulaEva = this.selectedAula;
    //evaluador
    const idString: number = parseInt(this.localStorage.getItem('userId') || '0');
    if (this.evaluacionCab.evaluador !== undefined && this.evaluacionCab.evaluador !== null) {
      this.evaluacionCab.evaluador.usuId = idString;
    }
    // Obtener la suma total de cada tipo de calificación
    // this.evaluacionCab.totalC = this.contarC;
    // this.evaluacionCab.totalCm = this.contarCM;
    // this.evaluacionCab.totalNc = this.contarNC;

    // // Calcular los porcentajes totales
    // this.evaluacionCab.progreso = this.criterios.length;
    // this.evaluacionCab.porcTotalC = (this.evaluacionCab.totalC / this.evaluacionCab.progreso) * 100;
    // this.evaluacionCab.porcTotalCm = (this.evaluacionCab.totalCm / this.evaluacionCab.progreso) * 100;
    // this.evaluacionCab.porcTotalNc = (this.evaluacionCab.totalNc / this.evaluacionCab.progreso) * 100;
    // this.evaluacionCab.estado=1;

    // Determinar las observaciones
    if (this.evaluacionCab.progreso == 100) {
      this.evaluacionCab.observaciones = 'El formulario está completo.';
    } else {
      this.evaluacionCab.observaciones = 'Por favor, complete el formulario.';
    }

    this.evaluacionCab.fechaRegistro = new Date();


    // Llamamos al servicio para crear la EvaluacionCab
    this.evaluacionCabService.CrearEvaluacionCab(this.evaluacionCab).subscribe(
      cab => {

        // La EvaluacionCab se ha actualizado correctamente
        console.log('EvaluacionCab creada correctamente.');
        console.log(cab);

        this.evaluacionDets.forEach(det => {
          det.evaluacionCab.nroEvaluacion = cab.nroEvaluacion;
        });

        this.evaluacionDetService.createList(this.evaluacionDets).subscribe(det => {
          console.log('EvaluacioDet Creada correctamente.');
          console.log(det);
        })

      }, error => {
        // Error al guardar la EvaluacionCab
        console.error('Error al crear la EvaluacionCab: ', error);
      }
    );
    // this.guardarCalificaciones();
  }




  updateNuevaEvaluacionCab() {

    //asignar aula
    this.evaluacionCab.aulaEva = this.selectedAula;
    //evaluador
    const idString: number = parseInt(this.localStorage.getItem('userId') || '0');
    if (this.evaluacionCab.evaluador !== undefined && this.evaluacionCab.evaluador !== null) {
      this.evaluacionCab.evaluador.usuId = idString;
    }
    // Obtener la suma total de cada tipo de calificación
    this.evaluacionCab.totalC = this.contarC;
    this.evaluacionCab.totalCm = this.contarCM;
    this.evaluacionCab.totalNc = this.contarNC;
    this.evaluacionCab.estado = 1;

    // Calcular los porcentajes totales
    const totalCriterios = this.criterios.length;
    this.evaluacionCab.porcTotalC = (this.evaluacionCab.totalC / totalCriterios) * 100;
    this.evaluacionCab.porcTotalCm = (this.evaluacionCab.totalCm / totalCriterios) * 100;
    this.evaluacionCab.porcTotalNc = (this.evaluacionCab.totalNc / totalCriterios) * 100;

    // Determinar las observaciones
    if (this.evaluacionCab.progreso == 100) {
      this.evaluacionCab.observaciones = 'El formulario está completo.';
    } else {
      this.evaluacionCab.observaciones = 'Por favor, complete el formulario.';
    }

    this.evaluacionCab.fechaRegistro = new Date();


    // Llamamos al servicio para crear la EvaluacionCab
    this.evaluacionCabService.update(this.id, this.evaluacionCab).subscribe(
      cab => {

        // La EvaluacionCab se ha actualizado correctamente
        console.log('EvaluacionCab actualizada correctamente.');
        console.log(cab);



        this.evaluacionDetService.updateList(this.evaluacionDets).subscribe(det => {
          console.log('EvaluacionCab actualizada correctamente.');
          console.log(det);
        })

      }, error => {
        // Error al actualizar la EvaluacionCab
        console.error('Error al crear la EvaluacionCab: ', error);
      }
    );
    // this.guardarCalificaciones();
  }

  // updateCalificaciones() {
  //   this.calificacionesPorCriterio.forEach(calificacion => {
  //     // Crea una nueva instancia de EvaluacionDet

  //     this.evaluacionDet.secCalificacion = 0; // El ID se generará automáticamente en la base de datos
  //     this.evaluacionDet.evaluacionCab.nroEvaluacion = this.evaluacionCab.nroEvaluacion,
  //       this.evaluacionDet.criterio!.idCriterio = calificacion.idCriterio, // Asigna el ID del criterio
  //       this.evaluacionDet.calificacion!.codCalificacion = calificacion.calificacion  // Asigna el ID de la calificación
  //     // console.log(this.evaluacionDet.secCalificacion);
  //     // console.log(this.evaluacionDet.evaluacionCab);
  //     // console.log(this.evaluacionDet.criterio!.idCriterio);
  //     // console.log(this.evaluacionDet.calificacion!.codCalificacion);

  //     this.evaluacionDetService.updateList(this.evaluacionDets).subscribe(
  //       (response) => {
  //         console.log('Calificación guardada exitosamente:', response);
  //         // Aquí puedes realizar cualquier otra acción necesaria después de guardar la calificación
  //       },
  //       (error) => {
  //         console.error('Error al guardar calificación:', error);
  //         // Aquí se maneja el error
  //       }
  //     );
  //   });
  // }



  // formularioCompleto(): boolean {
  //   // Verificamos si se han seleccionado todos los criterios
  //   const criteriosSeleccionados = this.calificacionesPorCriterio.length === this.criterios.length;

  //   // Verificamos si se han asignado calificaciones a todos los criterios
  //   const calificacionesAsignadas = this.calificacionesPorCriterio.every(item => item.calificacion !== '');

  //   // El formulario está completo si se han seleccionado todos los criterios y se han asignado calificaciones a cada uno
  //   return criteriosSeleccionados && calificacionesAsignadas;
  // }

}
