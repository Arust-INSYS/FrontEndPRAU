import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeriodoAc } from '../../../models/periodoAc';
import { UsuarioPorRolDTO } from '../../../models/UsuarioPorRolDTO';
import { Asignatura } from '../../../models/asignatura';
import { Usuario } from '../../../models/usuario';
import { Aula } from '../../../models/aula';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
import { UsuarioService } from '../../../services/usuario.service';
import { AsignaturaService } from '../../../services/asignatura.service';
import { AulaService } from '../../../services/aula.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-aula',
  templateUrl: './actualizar-aula.component.html',
  styleUrl: './actualizar-aula.component.css'
})
export class ActualizarAulaComponent  implements OnInit{

 // @Input() aulaId!: number;
 // aula: Aula = new Aula();
 aulaId!: number;
  
  f!: NgForm;

  periodos: PeriodoAc[] = [];
  selectedPeriodo: PeriodoAc | undefined;


  selectedDocente:UsuarioPorRolDTO | undefined;
  docentes: UsuarioPorRolDTO[] = [];
  asignaturas: Asignatura[] = [];
  selectedAsignatura:Asignatura | undefined;

  docente:Usuario = new Usuario;
  //DROPDOWN AULA
cicloSeleccion: { label: string, value: string }[] = [
  { label: 'Ciclo 1', value: 'Ciclo 1' },
  { label: 'Ciclo 2', value: 'Ciclo 2' },
  { label: 'Ciclo 3', value: 'Ciclo 3' },
  { label: 'Ciclo 4', value: 'Ciclo 4' },
  { label: 'Ciclo 5', value: 'Ciclo 5' },
  { label: 'Ciclo 6', value: 'Ciclo 6' }
];

  actualizadaAula:Aula = new Aula;
  constructor(private periodoAcService: PeriodoAcService,
    private usuarioService: UsuarioService,
    private asignaturaService: AsignaturaService,
    private aulaServie:AulaService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

    private route: ActivatedRoute,
  ) { }
  ngOnInit() {

    const aulaId = this.route.snapshot.params['id']; // Obtener el ID del periodo de la URL
    this.aulaServie.getAulaById(aulaId).subscribe(
      (aula) => {
        this.actualizadaAula = aula; 
        console.log('El aula es ', this.actualizadaAula);
       // Si actualizadaAula.docente.usuId está definido, establece el docente seleccionado en el dropdown
    
      
      
      
      
      },
      (error) => {
        console.error('Error obteniendo el periodo académico:', error);
        this.toastr.error('Error obteniendo el periodo académico.');
      }
    );

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


  onPeriodoChange(event: any) {
    this.selectedPeriodo = this.periodos.find(periodo => periodo.idPeriodoAc == event.target.value);
    if (this.selectedPeriodo) {
console.log('Selected Periodo ID:', this.selectedPeriodo.idPeriodoAc);
      this.actualizadaAula.periodoAc=this.selectedPeriodo;
    }
  }


  onDocenteChange(event: any) {
    this.selectedDocente = this.docentes.find(docente => docente.usuId == event.target.value);
    if (this.selectedDocente) {
      console.log('Selected Docente ID:', this.selectedDocente.usuId);
         this.docente.usuId=this.selectedDocente.usuId;
      this.actualizadaAula.docente=this.docente;
    }
  }

  
  
  
  getFullName(docente: UsuarioPorRolDTO) {
    return docente.perNombre1 + ' ' + docente.perApellido1;
  }
  onAsignaturaChange(event: any) {
    this.selectedAsignatura = this.asignaturas.find(asignatura => asignatura.idAsignatura == event.target.value);
    if (this.selectedAsignatura) {
     console.log('Selected Asignatura ID:', this.selectedAsignatura.idAsignatura);
      this.actualizadaAula.asignatura=this.selectedAsignatura;
    }
  }

  //crea aula 
  actualizar(form: NgForm) {
    if (form.valid) {
  

     
        this.aulaServie.update(this.actualizadaAula.aulaId,this.actualizadaAula).subscribe(
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
              this.router.navigate(['/menu/contenido-virtual/listar-aulas']);
            }
          }
        );
      
    }else {
      this.toastr.error('Por favor, complete todos los campos obligatorios.');
    }

  
  }

  resetForm() {
    this.actualizadaAula = new Aula();
    this.f.form.markAsPristine();
    this.f.form.markAsUntouched();
  }

}
