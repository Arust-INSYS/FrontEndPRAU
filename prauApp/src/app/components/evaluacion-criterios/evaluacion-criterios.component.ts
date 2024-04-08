import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EvaluacionCab } from '../../models/evaluacionCab';
import { EvaluacionCabService } from '../../services/evaluacionCab.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/sharedData.service';
import { Usuario } from '../../models/usuario';
import { Aula } from '../../models/aula';
import { AulaService } from '../../services/aula.service';
import { UsuarioService } from '../../services/usuario.service';

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
  nombreCurso: string = ''; // Variable para almacenar el nombre del curso seleccionado
  nombreDocente: string = ''; // Variable para almacenar el nombre del docente asociado al curso seleccionado
  usuario: Usuario[] = [];
  docentes: Usuario[] = [];
  cursos: Aula[] = [];
  cursoSeleccionado: Aula | null = null;
  docenteSeleccionado: Usuario | null = null;
  
  customers: any
  selectedCustomers:any
  loading:any
  
  constructor(private evaluacionCABService: EvaluacionCabService,  
    private usuarioService: UsuarioService,
    private aulaService: AulaService,
    private router: Router,
    private toastr: ToastrService,
    private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.getEvaluacionesCAB();
    this.getDocentes();
  }

  getDocentes(): void {
    // Obtener los usuarios con el rol de docente
    this.usuarioService.getJefesByRolId(4).subscribe(docentes => {
      this.docentes = docentes;
    });
  }

  getCursosPorDocente(idDocente: number): void {
    // Obtener las aulas asociadas al docente específico
    this.aulaService.getAulasPorUsuario(idDocente).subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  cargarInformacionCurso(): void {
    if (this.cursoSeleccionado) {
      this.nombreCurso = this.cursoSeleccionado.aulaNombre;
    } else {
      this.nombreCurso = ''; // Reinicia el nombre del curso si no se selecciona ningún curso
    }
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
 
  filtrar() {
  }

  crearNuevoDato(): void {

    if (this.docenteSeleccionado && this.cursoSeleccionado) {
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
      aula: this.cursoSeleccionado,
      usuario: this.docenteSeleccionado
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
    } else {
      // Mostrar mensaje de error si no se han seleccionado docente y curso
      this.toastr.error('Debe seleccionar un docente y un curso.');
    }
  }


  
  actualizarCriterio(id: number) {
    

  }

  // Método para eliminar un criterio
  eliminarCriterio(id: number) {
    

  }
}