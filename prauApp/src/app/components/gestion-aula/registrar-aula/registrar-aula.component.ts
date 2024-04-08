import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PeriodoAc } from '../../../models/periodoAc';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { UsuarioPorRolDTO } from '../../../models/UsuarioPorRolDTO';
import { AsignaturaService } from '../../../services/asignatura.service';
import { Asignatura } from '../../../models/asignatura';
import { NgForm } from '@angular/forms';
import { AulaService } from '../../../services/aula.service';
import { Aula } from '../../../models/aula';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

//import { PeriodoAc } from '../../../models/';

@Component({
  selector: 'app-registrar-aula',
  templateUrl: './registrar-aula.component.html',
  styleUrl: './registrar-aula.component.css'
})
export class RegistrarAulaComponent implements OnInit{


  f!: NgForm;

  periodos: PeriodoAc[] = [];
  selectedPeriodo: PeriodoAc | undefined;




  selectedDocente:UsuarioPorRolDTO | undefined;
  docentes: UsuarioPorRolDTO[] = [];
  asignaturas: Asignatura[] = [];
  selectedAsignatura:Asignatura | undefined;

  docente:Usuario = new Usuario;

  nuevaAula:Aula = new Aula;
  docenteSeleccionado: boolean = false;
  asiganturaSeleccionado: boolean = false;
  periodoSeleccionado: boolean = false;
  constructor(private periodoAcService: PeriodoAcService,
    private usuarioService: UsuarioService,
    private asignaturaService: AsignaturaService,
    private aulaServie:AulaService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

 ngOnInit() {
    this.periodoAcService.getPeriodosAcs().subscribe((periodos) => {
      this.periodos = periodos;
      
    });

    // this.usuarioService.findUsuariosByRolId(4).subscribe((usuariosPorRol) => {
    //   this.docentes = usuariosPorRol;
  

    //   console.log(this.docentes);
    // });

    this.usuarioService.findUsuariosByRolId(4).subscribe((usuariosPorRol) => {
      this.docentes = usuariosPorRol.map(docente => ({
        ...docente,
        fullName: this.getFullName(docente)
      }));
      console.log(this.docentes);
    });
    

    this.asignaturaService.obtenerListaAsignaturas().subscribe(data => {
      this.asignaturas = data;

      console.log(this.asignaturas);
    });
   

  }


  getFullName(docente: UsuarioPorRolDTO) {
    return docente.perNombre1 + ' ' + docente.perApellido1;
  }
  
  onPeriodoChange(event: any) {
    this.asiganturaSeleccionado = !!event.value;
    this.selectedPeriodo = this.periodos.find(periodo => periodo.idPeriodoAc == event.target.value);
    if (this.selectedPeriodo) {
      console.log('Selected Periodo ID:', this.selectedPeriodo.idPeriodoAc);
      this.nuevaAula.periodoAc=this.selectedPeriodo;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    }
  }

  onDocenteChange(event: any) {
    this.docenteSeleccionado = !!event.value;
    this.selectedDocente = this.docentes.find(docente => docente.usuId == event.target.value);
    if (this.selectedDocente) {
      console.log('Selected Docente ID:', this.selectedDocente.usuId);
      this.docente.usuId=this.selectedDocente.usuId;
      this.nuevaAula.docente=this.docente;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    }
  }

  onAsignaturaChange(event: any) {
    this.asiganturaSeleccionado = !!event.value;
    this.selectedAsignatura = this.asignaturas.find(asignatura => asignatura.idAsignatura == event.target.value);
    if (this.selectedAsignatura) {
      console.log('Selected Asignatura ID:', this.selectedAsignatura.idAsignatura);
      this.nuevaAula.asignatura=this.selectedAsignatura;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    }
  }


  //crea aula 
  registrar(form: NgForm) {
    
    if (form.valid) {
  
        this.aulaServie.registrarAula(this.nuevaAula).subscribe(
          (response) => {
            // Si la respuesta es exitosa
            this.router.navigate(['/menu/contenido-virtual/listar-aulas']);
            this.toastr.success('Se guardó correctamente');
            this.resetForm(); 

          },
          (error) => {
            if (error.status === 409) {
              // 409 es el código de estado para Conflict
              this.toastr.error(error.error); // Muestra el mensaje de error que viene del servidor
              this.router.navigate(['/menu/contenido-virtual/listar-aulas']);
            } else {
              this.toastr.error(
                'Ocurrió un error al guardar el Aula.'
              );
              this.router.navigate(['/menu/contenido-virtual/listar-aulas']);
            }
          }
        );
      
    }
  }

  resetForm() {
    this.nuevaAula = new Aula();
    this.f.form.markAsPristine();
    this.f.form.markAsUntouched();
  }

}
