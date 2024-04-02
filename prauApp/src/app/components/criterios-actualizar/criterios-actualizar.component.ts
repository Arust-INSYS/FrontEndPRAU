import { Component } from '@angular/core';
import { Criterios } from '../../models/criterios';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriosService } from '../../services/criterios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-criterios-actualizar',
  templateUrl: './criterios-actualizar.component.html',
  styleUrl: './criterios-actualizar.component.css',
})
export class CriteriosActualizarComponent {
  id!: number;
  criterio: Criterios = new Criterios();
  criterios: Criterios[] = [];
  constructor(
    private criteriosService: CriteriosService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cargarCriterio(this.id);
    });
  }

  cargarCriterio(id: number) {
    this.criteriosService.obtenerCriterioPorId(id).subscribe(
      (response) => {
        this.criterio = response;
      },
      (error) => {
        console.error('Error al cargar el criterio:', error);
      }
    );
  }

  onSubmit() {
    // Verificar si los campos están llenos
    if (
      !this.id ||
      !this.criterio.nombreCriterio ||
      !this.criterio.descripcion
    ) {
      this.toastr.error('Llene todos los campos antes de enviar.');
      return; // Detener el envío si los campos no están llenos
    }

    this.criteriosService.actualizarcriterios(this.id, this.criterio).subscribe(
      (dato) => {
        this.router.navigateByUrl('/menu/contenido-criterios/criterios-listar');
      },
      (error) => {
        console.error('Error al actualizar el criterio:', error);
        if (
          error.error &&
          error.error === 'El nombre de la clasificacion ya está en uso'
        ) {
          this.toastr.error(
            'El nombre de la clasificacion ya está en uso, por favor ingrese otro.'
          );
        } else {
          this.toastr.error(
            'Ocurrió un error al actualizar el criterio. Por favor, inténtelo de nuevo.'
          );
        }
      }
    );
  }
}
