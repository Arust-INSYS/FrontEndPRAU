import { Component } from '@angular/core';
import { PeriodoAcService } from '../../../services/periodo-ac.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodoAc } from '../../../models/PeriodoAc';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrar-periodo-ac',
  templateUrl: './registrar-periodo-ac.component.html',
  styleUrl: './registrar-periodo-ac.component.css'
})
export class RegistrarPeriodoAcComponent {

  constructor(
    private periodoAcService: PeriodoAcService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
   
  }

  periodoAc :PeriodoAc = new PeriodoAc();
  
  actualizarNombrePeriodo() {
    if (this.periodoAc.fechaInicio && this.periodoAc.fechaFin) {
      let yearInicio = this.periodoAc.fechaInicio.getFullYear();
      let yearFin = this.periodoAc.fechaFin.getFullYear();
      this.periodoAc.nombrePeriodo = yearInicio + '-' + yearFin;
    }
  }


  registrar(form: NgForm) {
    if (form.valid) {
      let fechaActual = new Date();
      let duracionMaxima = 12; // Duración máxima en meses
      let duracionMinima = 6; // Duración mínima en meses
  
      let duracion = (this.periodoAc.fechaFin.getFullYear() - this.periodoAc.fechaInicio.getFullYear()) * 12;
      duracion -= this.periodoAc.fechaInicio.getMonth();
      duracion += this.periodoAc.fechaFin.getMonth();
      duracion <= 0 ? duracion = 0 : duracion;
  
      if (this.periodoAc.fechaInicio < fechaActual || this.periodoAc.fechaFin < fechaActual) {
        this.toastr.error('La fecha de inicio y la fecha de fin deben estar en el futuro.');
      } else if (this.periodoAc.fechaInicio >= this.periodoAc.fechaFin) {
        this.toastr.error('La fecha de inicio debe ser menor que la fecha de fin.');
      // } else if (duracion < duracionMinima || duracion > duracionMaxima) {
      //   this.toastr.error('La duración del periodo académico debe estar entre ' + duracionMinima + ' y ' + duracionMaxima + ' meses.');
      // } 
      }else {
        this.periodoAcService.registrarPeriodoAc(this.periodoAc).subscribe(
          (response) => {
            // Si la respuesta es exitosa
            this.router.navigate(['/listar-periodos-acs']);
            this.toastr.success('Se guardó correctamente');
          },
          (error) => {
         
            if (error.status === 409) { // 409 es el código de estado para Conflict
              this.toastr.error(error.error); // Muestra el mensaje de error que viene del servidor
            } else {
              this.toastr.error('Ocurrió un error al guardar el período académico.');
            }
          }
        );
      }
    }
  }
  


  
  
  


}
