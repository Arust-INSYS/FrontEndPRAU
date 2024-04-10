import { Component } from '@angular/core';
import { Asignatura } from '../../models/asignatura';
import { Carrera} from '../../models/carrera';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarreraService } from '../../services/carrera.service';
import { AsignaturaService } from '../../services/asignatura.service';
@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrl: './asignatura.component.css'
})
export class AsignaturaComponent {
  asignatura: Asignatura = new Asignatura();
  asignaturas: Asignatura[] = [];
  carrera: Carrera[] = [];
  constructor(
    private asignaturaService: AsignaturaService,
    private router: Router,
    private toastr: ToastrService,
    private CarreraService: CarreraService,
  ) {}
  ngOnInit(): void {
    this.obtenerasignaturas();
    this.obtenerCarreras();
  }

  obtenerasignaturas() {
    this.asignaturaService.obtenerListaAsignaturas().subscribe((dato) => {
      this.asignaturas = dato;
    });
  }
  obtenerCarreras() {
    this.CarreraService.obtenerListaCarreras().subscribe((dato) => {
        this.carrera = dato;
      });
  }
 

  guardarAsignatura() {
    if (
      !this.asignatura.nombreAsignatura ||
      !this.asignatura.descripcionAsignatura ||
      !this.asignatura.carrera?.idCarrera
    ) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
    const clasificacionSeleccionada = this.asignatura.carrera;
    this.asignaturaService.registrarasignaturas(this.asignatura).subscribe(
      () => {
        this.obtenerasignaturas();
        this.router.navigateByUrl('/menu/contenido-virtual/asignatura-listar');
        this.toastr.success('Asignatura guardada exitosamente.', 'Éxito');
        this.asignatura.nombreAsignatura = '';
        this.asignatura.descripcionAsignatura = '';
        this.asignatura.carrera = clasificacionSeleccionada;
      },
      (error) => {
        if (error.error === 'La asignatura ya ha sido registrado previamente.') {
          this.toastr.error(error.error, 'Error');
        } else {
          this.toastr.error(
            'Error al guardar el asignatura. Por favor, inténtelo de nuevo más tarde.',
            'Error'
          );
        }
      }
    );
  }

  onSubmit() {
    this.guardarAsignatura();
  }
}
