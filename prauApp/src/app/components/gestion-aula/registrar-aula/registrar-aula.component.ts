import { Component, OnInit } from '@angular/core';
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
  constructor(private periodoAcService: PeriodoAcService,
    private usuarioService: UsuarioService,
    private asignaturaService: AsignaturaService,
    private aulaServie:AulaService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

 ngOnInit() {
    this.periodoAcService.getPeriodosAcs().subscribe((periodos) => {
      this.periodos = periodos;
      
    });

    this.usuarioService.findUsuariosByRolId(4).subscribe((usuariosPorRol) => {
      this.docentes = usuariosPorRol;
  

      console.log(this.docentes);
    });

    this.asignaturaService.obtenerListaAsignaturas().subscribe(data => {
      this.asignaturas = data;

      console.log(this.asignaturas);
    });
   

  }



  onPeriodoChange(event: any) {
    this.selectedPeriodo = this.periodos.find(periodo => periodo.idPeriodoAc == event.target.value);
    if (this.selectedPeriodo) {
      console.log('Selected Periodo ID:', this.selectedPeriodo.idPeriodoAc);
      this.nuevaAula.periodoAc=this.selectedPeriodo;
    }
  }


  onDocenteChange(event: any) {
    this.selectedDocente = this.docentes.find(docente => docente.usuId == event.target.value);
    if (this.selectedDocente) {
      console.log('Selected Docente ID:', this.selectedDocente.usuId);
         this.docente.usuId=this.selectedDocente.usuId;
      this.nuevaAula.docente=this.docente;
    }
  }
  onAsignaturaChange(event: any) {
    this.selectedAsignatura = this.asignaturas.find(asignatura => asignatura.idAsignatura == event.target.value);
    if (this.selectedAsignatura) {
      console.log('Selected Asignatura ID:', this.selectedAsignatura.idAsignatura);
      this.nuevaAula.asignatura=this.selectedAsignatura;
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
            } else {
              this.toastr.error(
                'Ocurrió un error al guardar el Aula.'
              );
            }
          }
        );
      
    }
  }

  resetForm() {
  //  this.periodoAc = new PeriodoAc();
    this.f.form.markAsPristine();
    this.f.form.markAsUntouched();
  }

}
