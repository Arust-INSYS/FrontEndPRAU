import { Component } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { Usuario } from '../../models/usuario';
import { ClasificacionUsuariosService } from '../../services/clasificacion-usuarios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarreraService } from '../../services/carrera.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrl: './carrera.component.css'
})
export class CarreraComponent {
  carrera: Carrera = new Carrera();
  carreras: Carrera[] = [];
  usuarios: Usuario[] = [];
  constructor(
    private CarreraService: CarreraService,
    private router: Router,
    private toastr: ToastrService,
    private clasificacionUsuariosService: ClasificacionUsuariosService
  ) {}
  ngOnInit(): void {
    this.obtenercarreras();
    this.obtenerUsuarios();
  }

  obtenercarreras() {
    this.CarreraService.obtenerListaCarreras().subscribe((dato) => {
      this.carreras = dato;
    });
  }

  obtenerUsuarios() {
    this.clasificacionUsuariosService
      .obtenerListausuarios()
      .subscribe((dato) => {
        this.usuarios = dato;
      });
  }

  guardarCarrera() {
    if (
      !this.carrera.nombreCarrera ||
      !this.carrera.descripcionCarrera ||
      !this.carrera.director?.usuId
    ) {
      this.toastr.error('Por favor, complete todos los campos.', 'Error');
      return;
    }
    const clasificacionSeleccionada = this.carrera.director;
    this.CarreraService.registrarcarreras(this.carrera).subscribe(
      () => {
        this.obtenercarreras();
        this.router.navigateByUrl('/menu/contenido-virtual/carrera');
        this.toastr.success('Carrera guardada exitosamente.', 'Éxito');
        this.carrera.nombreCarrera = '';
        this.carrera.descripcionCarrera = '';
        this.carrera.director = clasificacionSeleccionada;
      },
      (error) => {
        if (error.error === 'La carrera ya ha sido registrado previamente.') {
          this.toastr.error(error.error, 'Error');
        } else {
          this.toastr.error(
            'Error al guardar la carrera. Por favor, inténtelo de nuevo más tarde.',
            'Error'
          );
        }
      }
    );
  }

  onSubmit() {
    this.guardarCarrera();
  }
}
