import { Component } from '@angular/core';
import { Carrera } from '../../models/carrera';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService } from '../../services/carrera.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrera-actualizar',
  templateUrl: './carrera-actualizar.component.html',
  styleUrl: './carrera-actualizar.component.css'
})
export class CarreraActualizarComponent {
  id!: number;
  carrera: Carrera = new Carrera();
  carreras: Carrera[] = [];
  constructor(
    private carreraService: CarreraService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cargarCarrera(this.id);
    });
  }

  cargarCarrera(id: number) {
    this.carreraService.obtenerCarreraPorId(id).subscribe(
      (response) => {
        this.carrera = response;
      },
      (error) => {
        console.error('Error al cargar la carrera:', error);
      }
    );
  }

  onSubmit() {
    // Verificar si los campos están llenos
    if (
      !this.id ||
      !this.carrera.nombreCarrera ||
      !this.carrera.descripcionCarrera ||
      !this.carrera.director
    ) {
      this.toastr.error('Llene todos los campos antes de enviar.');
      return; // Detener el envío si los campos no están llenos
    }

    this.carreraService.actualizarcarrera(this.id, this.carrera).subscribe(
      (dato) => {
        this.router.navigateByUrl('/menu/contenido-virtual/carrera-listar');
      },
      (error) => {
        console.error('Error al actualizar la carrera:', error);
        if (
          error.error &&
          error.error === 'El nombre  ya está en uso'
        ) {
          this.toastr.error(
            'El nombre ya está en uso, por favor ingrese otro.'
          );
        } else {
          this.toastr.error(
            'Ese nombre ya esta en uso'
          );
        }
      }
    );
  }
}
