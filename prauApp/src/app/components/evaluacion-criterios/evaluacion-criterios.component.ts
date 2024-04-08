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
  docentes: any[] = [];
  cursos: any[] = [];
  docenteSeleccionado: number | null = null; // Almacenará el ID del docente seleccionado
  cursoSeleccionado: number=0; // Almacenará el ID del curso seleccionado
  idAulaSeleccionada: number | null = null;

  
  customers: any
  selectedCustomers:any
  loading:any
  
  constructor(private evaluacionCABService: EvaluacionCabService,  
    private usuarioService: UsuarioService,
    private aulaService: AulaService,
    private router: Router,
    private toastr: ToastrService,
    private sharedDataService: SharedDataService) {}


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

  async listarevalu() {
    await this.usuarioService.getUsersByRoleId(4).subscribe((res: any[]) => {
      this.docentes = res.map((doc) => ({
        label: doc.perNombre1,
        value: doc.usuId,
      }));
    });
  }

  recibirID(numero: number){
    console.log(numero,'Id Recibido')
  }
  onDocenteSeleccionado(selectedDocente: any) {
    // Aquí puedes realizar el cálculo o cualquier otra acción necesaria
    console.log('Docente seleccionado:', selectedDocente);
    this.getCursosPorDocente(selectedDocente);
}

  getCursosPorDocente(docenteId: number){
    if (docenteId) {
      // Obtener las aulas asociadas al docente específico utilizando su ID
      this.aulaService.getAulasPorUsuario(docenteId).subscribe(aulas => {
          // Mapear la respuesta para almacenar solo el nombre y el ID de cada aula
          this.cursos = aulas.map(aula => ({ id: aula.aulaId, nombre: aula.aulaNombre }));
      });
      console.log('Aula Seleccionada', this.cursos[0]);
  } else {
    
      // Si no se proporciona ningún ID de docente, reiniciar la lista de cursos
      this.cursos = [];
  }
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

  crearNuevoDato(): void {
    if (this.docenteSeleccionado && this.cursoSeleccionado !== null) {
      // Obtener el objeto Usuario completo usando el ID del docente seleccionado
      this.usuarioService.getUsersByRoleId(this.docenteSeleccionado).subscribe((usuarios: Usuario[]) => {
          if (usuarios && usuarios.length > 0) {
            const usuario = usuarios[0]; // Obtener el primer usuario
            // Obtener el objeto Aula completo usando el ID del curso seleccionado
            this.aulaService.getAulasPorUsuario(this.cursoSeleccionado).subscribe((aulas: Aula[]) => {
                if (aulas && aulas.length > 0) {
                  const aula = aulas[0]; // Obtener la primera aula
                  // Crear un nuevo objeto EvaluacionCab con todos los datos inicializados en 0
                  const nuevaEvaluacionCab: EvaluacionCab = {
                      nroEvaluacion: 0,
                      totalC: 0,
                      totalCm: 0,
                      totalNc: 0,
                      porcTotalC: 0,
                      porcTotalCm: 0,
                      porcTotalNc: 0,
                      observaciones: '', // Aquí podrías agregar las observaciones predeterminadas
                      aula: aula, // Asignar el objeto Aula obtenido
                      usuario: usuario // Asignar el objeto Usuario obtenido
                  };
                  // Ahora puedes usar nuevaEvaluacionCab para lo que necesites
                } else {
                  console.error('No se encontraron aulas para el usuario seleccionado.');
                }
            });
          } else {
            console.error('No se encontraron usuarios para el rol seleccionado.');
          }
      });
    }
}
 


  
  actualizarCriterio(id: number) {
    

  }

  // Método para eliminar un criterio
  eliminarCriterio(id: number) {
    

  }
}