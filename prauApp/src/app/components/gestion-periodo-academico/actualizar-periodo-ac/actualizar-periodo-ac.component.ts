import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoAc } from '../../../models/periodoAc';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-actualizar-periodo-ac',
  templateUrl: './actualizar-periodo-ac.component.html',
  styleUrl: './actualizar-periodo-ac.component.css'
})
export class ActualizarPeriodoAcComponent implements OnChanges{
  @Input() periodoId!: number;

  periodoAc: PeriodoAc = new PeriodoAc();
 // periodoId :number=0;
  f!: NgForm;
  constructor(
    private periodoAcService: PeriodoAcService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

 

  actualizarNombrePeriodo() {
    if (this.periodoAc.fechaInicio && this.periodoAc.fechaFin) {
      let yearInicio = this.periodoAc.fechaInicio.getFullYear();
      let yearFin = this.periodoAc.fechaFin.getFullYear();
      this.periodoAc.nombrePeriodo = yearInicio + '-' + yearFin;
    }
  }

  // ngOnInit() {
  //   console.log(this.periodoId); // Verifica que el periodoId esté definido correctamente
  //   this.activatedRoute.params.subscribe(params => {
  //     this.periodoId = params['id'];
  //     this.periodoAcService.getPeriodoAcById(this.periodoId).subscribe(
  //       (periodo) => {
  //         this.periodoAc = periodo; 
  //         console.log(this.periodoAc);
  //       },
  //       (error) => {
  //         console.error('Error obteniendo el periodo académico:', error);
  //         this.toastr.error('Error obteniendo el periodo académico.');
  //       }
  //     );
  //   });
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['periodoId'] && changes['periodoId'].currentValue) {
      this.obtenerPeriodoAc();
    }
  }
  

  obtenerPeriodoAc() {
    this.periodoAcService.getPeriodoAcById(this.periodoId).subscribe(
      (periodo) => {
        this.periodoAc = periodo; 
        console.log(this.periodoAc);
      },
      (error) => {
        console.error('Error obteniendo el periodo académico:', error);
        this.toastr.error('Error obteniendo el periodo académico.');
      }
    );
  }
  



  actualizar(form: NgForm) {
    if (form.valid) {
      let fechaActual = new Date();
      let duracionMaxima = 12; // Duración máxima en meses
      let duracionMinima = 6; // Duración mínima en meses

      let duracion =
        (this.periodoAc.fechaFin.getFullYear() -
          this.periodoAc.fechaInicio.getFullYear()) *
        12;
      duracion -= this.periodoAc.fechaInicio.getMonth();
      duracion += this.periodoAc.fechaFin.getMonth();
      duracion <= 0 ? (duracion = 0) : duracion;

      if (
        this.periodoAc.fechaInicio < fechaActual ||
        this.periodoAc.fechaFin < fechaActual
      ) {
        this.toastr.error(
          'La fecha de inicio y la fecha de fin deben estar en el futuro.'
        );
      } else if (this.periodoAc.fechaInicio >= this.periodoAc.fechaFin) {
        this.toastr.error(
          'La fecha de inicio debe ser menor que la fecha de fin.'
        );
        // } else if (duracion < duracionMinima || duracion > duracionMaxima) {
        //   this.toastr.error('La duración del periodo académico debe estar entre ' + duracionMinima + ' y ' + duracionMaxima + ' meses.');
        // }
      } else {
        this.periodoAcService.update(this.periodoAc.idPeriodoAc,this.periodoAc).subscribe(
          (response) => {
            // Si la respuesta es exitosa
            this.router.navigate(['/menu/contenido-virtual/listar-periodos-acs']);
            this.toastr.success('Se actualizo correctamente');
            this.resetForm(); 
          },
          (error) => {
            if (error.status === 409) {
              // 409 es el código de estado para Conflict
              this.toastr.error(error.error); // Muestra el mensaje de error que viene del servidor
            } else {
              this.toastr.error(
                'Ocurrió un error al actualizar el período académico.'
              );
            }
          }
        );
      }
    }
  }

  resetForm() {
    this.periodoAc = new PeriodoAc();
    this.f.form.markAsPristine();
    this.f.form.markAsUntouched();
  }


}
