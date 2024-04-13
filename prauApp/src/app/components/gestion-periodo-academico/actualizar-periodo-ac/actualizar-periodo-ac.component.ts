import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoAc } from '../../../models/periodoAc';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-actualizar-periodo-ac',
  templateUrl: './actualizar-periodo-ac.component.html',
  styleUrl: './actualizar-periodo-ac.component.css'
})
export class ActualizarPeriodoAcComponent implements OnInit {
  periodoAc: PeriodoAc = new PeriodoAc();
  periodoId: number = 0;
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
      let monthInicio = this.periodoAc.fechaInicio.getMonth();
      let yearFin = this.periodoAc.fechaFin.getFullYear();
      let monthFin = this.periodoAc.fechaFin.getMonth();
      this.periodoAc.nombrePeriodo = this.getFormattedPeriodName(yearInicio, monthInicio, yearFin, monthFin);
    }
  }
  private getFormattedPeriodName(yearInicio: number, monthInicio: number, yearFin: number, monthFin: number): string {
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return months[monthInicio] + '/' + yearInicio + '-' + months[monthFin] + '/' + yearFin;
  }


  ngOnInit() {
    const periodoId = this.route.snapshot.params['id'];
    this.periodoAcService.getPeriodoAcById(periodoId).subscribe(
      (periodo) => {
        periodo.fechaInicio = new Date(periodo.fechaInicio);
        periodo.fechaFin = new Date(periodo.fechaFin);
        this.periodoAc = periodo;
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
      let duracionMaxima = 12;
      let duracionMinima = 6;

      let duracion =
        (this.periodoAc.fechaFin.getFullYear() -
          this.periodoAc.fechaInicio.getFullYear()) *
        12;
      duracion -= this.periodoAc.fechaInicio.getMonth();
      duracion += this.periodoAc.fechaFin.getMonth();
      duracion <= 0 ? (duracion = 0) : duracion;

      if (this.periodoAc.fechaInicio >= this.periodoAc.fechaFin) {
        this.toastr.error(
          'La fecha de inicio debe ser menor que la fecha de fin.'
        );
      } else if (duracion < duracionMinima || duracion > duracionMaxima) {
        this.toastr.error('La duración del periodo académico debe estar entre ' + duracionMinima + ' y ' + duracionMaxima + ' meses.');
      } else {
        // Verificar si las fechas son iguales a las originales
        const fechasOriginales = this.obtenerFechasOriginales();
        if (
          this.sonFechasIguales(this.periodoAc.fechaInicio, fechasOriginales.fechaInicio) &&
          this.sonFechasIguales(this.periodoAc.fechaFin, fechasOriginales.fechaFin)
        ) {
          // Si las fechas son iguales, establecer las fechas originales
          this.periodoAc.fechaInicio = fechasOriginales.fechaInicio;
          this.periodoAc.fechaFin = fechasOriginales.fechaFin;
        }
        this.actualizarNombrePeriodo();
        this.periodoAcService.update(this.periodoAc.idPeriodoAc, this.periodoAc).subscribe(
          (response) => {
            this.router.navigate(['/menu/contenido-virtual/listar-periodo']);
            this.toastr.success('Se actualizó correctamente');
            this.resetForm();
          },
          (error) => {
            if (error.status === 409) {
              this.toastr.error(error.error);
              this.router.navigate(['/menu/contenido-virtual/listar-periodo']);
            } else {
              this.toastr.error('Ocurrió un error al actualizar el período académico.');
              this.router.navigate(['/menu/contenido-virtual/listar-periodo']);
            }
          }
        );
      }
    } else {
      this.toastr.error('Por favor, complete todos los campos obligatorios.');
    }
  }

  resetForm() {
    this.periodoAc = new PeriodoAc();
    this.f.form.markAsPristine();
    this.f.form.markAsUntouched();
  }

  sonFechasIguales(fecha1: Date, fecha2: Date): boolean {
    return fecha1.getTime() === fecha2.getTime();
  }

  obtenerFechasOriginales(): { fechaInicio: Date, fechaFin: Date } {

    return {
      fechaInicio: this.periodoAc.fechaInicio,
      fechaFin: this.periodoAc.fechaFin
    };
  }
  
}
