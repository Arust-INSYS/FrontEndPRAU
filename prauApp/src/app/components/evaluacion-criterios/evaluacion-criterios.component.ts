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
import { CarreraService } from '../../services/carrera.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion-criterios',
  templateUrl: './evaluacion-criterios.component.html',
  styleUrl: './evaluacion-criterios.component.css'
})
export class EvaluacionCriteriosComponent {
  @ViewChild('dt', { static: true }) table!: Table;
  searchTerm: string = '';
  items: MenuItem[] | undefined;
  $even: any;
  $odd: any;
  Delete: string | undefined;

  status: string="";

  dt: any;

  showModal() {
    throw new Error('Method not implemented.');
  }

  displayModal: boolean = false;
  evaluacionCa: EvaluacionCab = new EvaluacionCab();
  evaluacionCab: EvaluacionCab[] = [];
  nombreCurso: string = ''; // Variable para almacenar el nombre del curso seleccionado
  nombreDocente: string = ''; // Variable para almacenar el nombre del docente asociado al curso seleccionado
  usuario: Usuario[] = [];
  docentes: any[] = [];
  cursos: any[] = [];
  carrera: any[] = [];
  docenteSeleccionado: number | null = null; // Almacenará el ID del docente seleccionado
  cursoSeleccionado: number = 0; // Almacenará el ID del curso seleccionado
  idAulaSeleccionada: number | null = null;
//nro evaluacion
nroEvaluacion: number = 0;
  estado: number=1;// este es el estado establecido
  customers: any
  selectedCustomers: any
  loading: any

  constructor(private evaluacionCABService: EvaluacionCabService,
    private usuarioService: UsuarioService,
    private aulaService: AulaService,
    private router: Router,
    private toastr: ToastrService,
    private sharedDataService: SharedDataService,
    private carreraService: CarreraService,
    ) {}


  ngOnInit(): void {
    this.getEvaluacionesCAB();
    this.listarevalu();


  }
  //listarevalu() {
  //this.usuarioService.getUsersByRoleId(4).subscribe((res) => {
  //this.docentes = res;
  //    console.log(this.docentes);
  //  });
  //}

  cargarEvaluacion(id: number) {
    this.evaluacionCABService.findNroEvaluacion(id).subscribe(
      response => {
        this.evaluacionCa = response;
      },
      error => {
        console.error('Error al cargar la calificacion:', error);
      }
    );
  }

  obtenerNroEva(): void {
    this.evaluacionCABService.nroEvaluacionNew().subscribe(eva => {
      this.nroEvaluacion = eva;
    })
  }

  async listarcarrer() {
    await this.carreraService.obtenerListaCarreras().subscribe((res: any[]) => {
      this.carrera = res.map((doc) => ({
        label: doc.perNombre1,
        value: doc.usuId,
      }));
    });
  }

  async listarevalu() {
    await this.usuarioService.getUsersByRoleId(4).subscribe((res: any[]) => {
      this.docentes = res.map((doc) => ({
        label: doc.perNombre1,
        value: doc.usuId,
      }));
    });
  }

  recibirID(numero: number) {
    console.log(numero, 'Id Recibido')
  }
  onDocenteSeleccionado(selectedDocente: any) {
    // Aquí puedes realizar el cálculo o cualquier otra acción necesaria
    console.log('Docente seleccionado:', selectedDocente);
    this.listarcursos(selectedDocente);
    this.evaluacionCa.evaluador!.usuId = selectedDocente;
  }


async listarcursos(docenteId: number) {
  await this.aulaService.getAulasPorUsuario(docenteId).subscribe((aulas: any[]) => {
    this.cursos = aulas.map((doc) => ({
      label: doc.aulaNombre,
      value: doc.aulaId,
    }));
  });
}
onCursoSeleccionado(selectedCurso: any) {
  // Aquí puedes realizar el cálculo o cualquier otra acción necesaria
  console.log('Docente seleccionado:', selectedCurso);
  this.evaluacionCa.aulaEva!.aulaId=selectedCurso;
  //console.log('Este es el mensaje',this.evaluacionCa.aula)
}

  cargarInformacionCurso(): void {
    // Verificar que haya un curso seleccionado
    if (this.cursoSeleccionado) {
      // Asignar el ID del curso seleccionado a la variable idAulaSeleccionada
      this.idAulaSeleccionada = this.cursoSeleccionado;
    } else {
      // Reiniciar el ID del curso seleccionado si no hay ninguno seleccionado
      this.idAulaSeleccionada = null;
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

  crearNuevoDato(status: string) {
    this.router.navigate(['/menu/contenido-criterios/criterios-evaluacion-calificacion',this.status]);

    alert(status);
  }

  actualizarCriterio(id: number, status: string) {
  
    this.router.navigate(['/menu/contenido-criterios/criterios-evaluacion-calificacion', status, id]);
    alert(status);
  }

  // Método para eliminar un criterio
  eliminarCriterio(id: number, est: number) {
    let mensaje;
    if (est === 0) {
      mensaje = 'eliminar'
    } else {
      mensaje = 'activar'
    }
    Swal.fire({
      title: `¿Está seguro de que desea ${mensaje} la evaluacion?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Sí, ${mensaje}`,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluacionCABService.updateEstado(id, est).subscribe({
          next: () => {
            this.cargarEvaluacion(est)
            this.estado = est;
            if (est === 0) {
              this.toastr.success('ELIMINADO CORRECTAMENTE', 'ÉXITO');
            } else {
              this.toastr.success('ACTIVADO CORRECTAMENTE', 'ÉXITO');
            }
          },
          error: (error) => {
            // Manejar errores
          },
          complete: () => {
            // Manejar completado
          }
        });
      }
    });
  }
}